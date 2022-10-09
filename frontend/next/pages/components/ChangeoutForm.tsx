import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function ChangeoutForm({ price }) {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <>
      {console.log(price)}
      <PaymentElement />
      <div>金額</div>
      <div>小計　{Number(price).toLocaleString()}円（税込）</div>
      <div>送料　500円（税込）</div>
      <div>合計　{Number(price + 500).toLocaleString()}円（税込）</div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          if (!elements || !stripe) return;
          const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/mypage/`,
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
