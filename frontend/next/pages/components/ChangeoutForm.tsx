import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

export default function ChangeoutForm({ price }) {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  return (
    <>
      {console.log(price)}
      <PaymentElement />
      <div>金額</div>
      <div>小計　{price}円（税込）</div>
      <div>送料　500円（税込）</div>
      <div>合計　{price + 500}円（税込）</div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          if (!elements || !stripe) return;
          const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thanks/`,
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
