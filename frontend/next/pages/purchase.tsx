import React, { useEffect, useState } from "react";
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import CustomerForm from './components/CustomerForm';
import ShippmentForm from './components/ShippmentForm';
import CheckoutForm from './components/CheckoutForm';
import Product from './components/Product';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../layout/Layout';

const Payment: NextPage = (props) => {
  const router = useRouter();
  const [img, setImg] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState();
  const [userName, setUserName] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [tel, setTel] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [delTime, setDelTime] = useState(1);

  const nameChange = (value: React.SetStateAction<string>) => {
    setUserName(value);
  };

  const postcodeChange = (value: React.SetStateAction<string>) => {
    setPostcode(value);
  };

  const address1Change = (value: React.SetStateAction<string>) => {
    setAddress1(value);
  };

  const address2Change = (value: React.SetStateAction<string>) => {
    setAddress2(value);
  };

  const address3Change = (value: React.SetStateAction<string>) => {
    setAddress3(value);
  };

  const telChange = (value: React.SetStateAction<string>) => {
    setTel(value);
  };

  const deliveryDateChange = (value: React.SetStateAction<string>) => {
    setDeliveryDate(value);
  };

  const delTimeChange = (value: React.SetStateAction<number>) => {
    setDelTime(value);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${router.query.pid}`
      )
      .then((res: AxiosResponse) => {
        console.log(res);
        setImg(res.data.imgUrl);
        setProductName(res.data.name);
        setPrice(res.data.price);
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e));
  }, []);

  const stripePromise = loadStripe(
    'pk_test_51Lj08EAdWjJU6gVu0jSZOsBWC8979STy2xBzS9poCK7L6mQ9LmqRgyusN9LULZyJuReMYzeeJHm5yrfnPVV1m9j400j1qUc3QL'
  );

  return (
    <>
      <Layout>
        <form>
          <CustomerForm
            setUserName={setUserName}
            setPostcode={setPostcode}
            setAddress1={setAddress1}
            setAddress2={setAddress2}
            setAddress3={setAddress3}
            setTel={setTel}
            nameChange={nameChange}
            postcodeChange={postcodeChange}
            address1Change={address1Change}
            address2Change={address2Change}
            address3Change={address3Change}
            telChange={telChange}
          />
          <ShippmentForm
            props={props}
            setDeliveryDate={setDeliveryDate}
            setDelTime={setDelTime}
            deliveryDateChange={deliveryDateChange}
            delTimeChange={delTimeChange}
          />
          <Product img={img} productName={productName} price={price} />
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: router.query.cs,
            }}
          >
            <CheckoutForm
              stripe_sub_id={router.query.sub}
              product_id={router.query.pid}
              user_id={router.query.uid}
              price={price}
              userName={userName}
              postcode={postcode}
              address1={address1}
              address2={address2}
              address3={address3}
              tel={tel}
              deliveryDate={deliveryDate}
              delTime={delTime}
            />
          </Elements>
        </form>
        <button onClick={() => router.push("/")}>キャンセルする</button>
      </Layout>
    </>
  );
};

export default Payment;

export async function getServerSideProps() {
  const timezoneData = await axios.get(
    `${process.env.API_BASE_URL}/shippInfo/timezone`
  );
  const timezone = timezoneData.data;

  return {
    props: {
      timezone,
    },
  };
}
