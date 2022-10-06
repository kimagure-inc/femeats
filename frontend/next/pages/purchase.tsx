import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomerForm from './components/CustomerForm';
import ShippmentForm from './components/ShippmentForm';
import CheckoutForm from './components/CheckoutForm';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

interface Inputs {
  name: string;
  zipCode: number;
  prefecture: string;
  cityAndTown: string;
  otherAddresses: string;
  tel: number;
}

const Payment: NextPage = (props) => {
  const router = useRouter();

  // 購入確定ボタンで行うこと
  // DB：userテーブル更新、contractテーブル追加
  // stripe：決済、請求サイクル変更
  const { handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: any) => console.log(data);

  const stripePromise = loadStripe('pk_test_51Lj08EAdWjJU6gVu0jSZOsBWC8979STy2xBzS9poCK7L6mQ9LmqRgyusN9LULZyJuReMYzeeJHm5yrfnPVV1m9j400j1qUc3QL')

  // const options: StripeElementsOptions= {
  //   // passing the client secret obtained from the server
  //   // clientSecret: 'pi_3Lp16YAdWjJU6gVu0S2NgZp6_secret_KMDTTk1pT0q9k61ZZE8CsL1bH',
  //   clientSecret: router.query.data,
  // };

  console.log(router.query.data)

  // TODO：商品情報、お会計情報を表示させる
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerForm />
        <ShippmentForm props={props} />
        <Elements stripe={stripePromise} options={{
          clientSecret: router.query.data
        }
        }>
          <CheckoutForm data={router.query.data} />
        </Elements>
      </form>
      <button type="submit" onClick={() => router.push("/thanks")}>
        購入確定
      </button>
    </>
  )
}

export default Payment;

export async function getServerSideProps() {
  const timezoneData = await axios.get(`${process.env.API_BASE_URL}/shippInfo/timezone`);
  const timezone = timezoneData.data;

  return {
    props: {
      timezone,
    },
  };
}