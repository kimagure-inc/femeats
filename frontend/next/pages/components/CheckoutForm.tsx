import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm(props: { data: any }) {
  const stripe = useStripe();
  const elements = useElements();

  const stripePromise = loadStripe('pk_test_51Lj08EAdWjJU6gVu0jSZOsBWC8979STy2xBzS9poCK7L6mQ9LmqRgyusN9LULZyJuReMYzeeJHm5yrfnPVV1m9j400j1qUc3QL');

  const options = {
    clientSecret: props.data,
  };

  return (
    <>
    <div>
    <PaymentElement />
    <button onClick={async e => {
      e.preventDefault()
      if (!elements || !stripe) return;
      console.log("elements :", elements) // 追加
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: '/thanks'
        }
      })
      console.log(error)
    }}>決済</button>
    </div>
    </>
  );
}