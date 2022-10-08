import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';

export default function CheckoutForm(props: any) {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  let orderDate = new Date(props.deliveryDate);
  orderDate.setDate(orderDate.getDate() - 5);

  const data = {
    userData: {
      name: props.userName,
      postcode: props.postcode,
      address1: props.address1,
      address2: props.address2,
      address3: props.address3,
      telPhone: props.tel,
      stripe_sub_id: props.stripe_sub_id,
    },
    contractData: {
      product_id: Number(props.product_id),
      user_id: Number(props.user_id),
      timezone_id: Number(props.delTime),
      deliveryDate: new Date(props.deliveryDate),
      status_id: 1,
      orderDate: orderDate,
    },
  };

  return (
    <>
      <PaymentElement />
      <div>金額</div>
      <div>小計　{props.price}円（税込）</div>
      <div>送料　500円（税込）</div>
      <div>合計　{props.price + 500}円（税込）</div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          if (!elements || !stripe) return;
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe/user/${props.user_id}`,
              data
            )
            .then((res: AxiosResponse) => {
              console.log(res);
            })
            .catch((e: AxiosError<{ error: string }>) => console.log(e));
          const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thanks`,
            },
          });
          console.log(error);
        }}
      >
        購入を確定する
      </button>
    </>
  );
}
