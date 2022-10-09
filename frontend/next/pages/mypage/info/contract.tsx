import React, { useEffect, useState } from 'react';
import MyPage from '../../../layout/mypage';
import axios from 'axios';
import Layout from '../../../layout/Layout';
import { useRouter } from 'next/router';
import Product from '../../components/Product';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShippmentForm from '../../components/ShippmentForm';
import ChangeoutForm from '../../components/ChangeoutForm';

type userData = {};

export default function Info() {
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [selectPlan, setSelectPlan] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [delTime, setDelTime] = useState(1);
  const [page, setPage] = useState(false);
  const [selectCycle, setSelectCycle] = useState('');
  const [cs, setCs] = useState('');
  const [stripe, setStripe] = useState('');
  let product;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (isLoading)
    return (
      <Layout>
        <MyPage>
          <p>Loading...</p>
        </MyPage>
      </Layout>
    );
  if (!data) return <p>No profile data</p>;

  const planChange = (event: SelectChangeEvent) => {
    setSelectPlan(event.target.value);
  };

  const select = (plan, cycle, data) => {
    for (let i = 0; i < data.product.length; i++) {
      if (
        cycle == data.product[i].deliveryCycle &&
        plan == data.product[i].name
      ) {
        product = data.product[i];
        return data.product[i].id;
      }
    }
  };

  const deliveryDateChange = (value: React.SetStateAction<string>) => {
    setDeliveryDate(value);
  };

  const delTimeChange = (value: React.SetStateAction<number>) => {
    setDelTime(value);
  };

  const cycleChange = (event: SelectChangeEvent) => {
    setSelectCycle(event.target.value);
  };

  const stripePromise = loadStripe(
    'pk_test_51Lj08EAdWjJU6gVu0jSZOsBWC8979STy2xBzS9poCK7L6mQ9LmqRgyusN9LULZyJuReMYzeeJHm5yrfnPVV1m9j400j1qUc3QL'
  );

  let orderDate = new Date(deliveryDate);
  orderDate.setDate(orderDate.getDate() - 5);

  const postData = {
    email: data.contract.user.email,
    product_id: select(selectPlan, selectCycle, data),
    userid: Number(data.contract.id),
    contractData: {
      product_id: select(selectPlan, selectCycle, data),
      timezone_id: Number(delTime),
      deliveryDate: new Date(deliveryDate),
      status_id: 1,
      orderDate: orderDate,
    },
  };

  const Submit = () => {
    console.log(postData);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/cs`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setCs(res.data.subsuc.cs);
        setStripe(res.data.subsuc.subscribe_id);
        setPage(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Layout auth={true}>
      <MyPage>
        <>{console.log(data)}</>
        {!page ? (
          <div>
            <div>お申し込み中のプラン</div>
            <label>契約プラン</label>

            <select name='product' value={selectPlan} onChange={planChange}>
              {data.product.map((value: any) => (
                <option value={value.name} key={value.id}>
                  {value.name} -{Number(value.price).toLocaleString()}
                  円（税込）
                </option>
              ))}
            </select>
            <div>
              <div>お届けサイクル</div>
              <label>配送サイクル</label>
              <select name='product' value={selectCycle} onChange={cycleChange}>
                <option value={2}>2週間ごと</option>
                <option value={3}>3週間ごと</option>
                <option value={4}>4週間ごと</option>
              </select>

              <ShippmentForm
                props={data}
                setDeliveryDate={setDeliveryDate}
                setDelTime={setDelTime}
                deliveryDateChange={deliveryDateChange}
                delTimeChange={delTimeChange}
              />
            </div>
            <button onClick={Submit}>プラン決定</button>
          </div>
        ) : (
          <>
            {console.log(product)}
            <div>支払い情報入力</div>
            <Product
              img={product.imgUrl}
              productName={product.name}
              price={product.price}
            />
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: cs,
              }}
            >
              <ChangeoutForm price={product.price} />
            </Elements>
          </>
        )}
      </MyPage>
    </Layout>
  );
}
