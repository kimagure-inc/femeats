import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm(props: { data: any }) {
  const stripe = useStripe()
  const elements = useElements()
  // const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState('')
  console.log("props :", props)

  const stripePromise = loadStripe('pk_test_51Lj08EAdWjJU6gVu0jSZOsBWC8979STy2xBzS9poCK7L6mQ9LmqRgyusN9LULZyJuReMYzeeJHm5yrfnPVV1m9j400j1qUc3QL')

  const options = {
    // passing the client secret obtained from the server
    // clientSecret: 'pi_3Lp16YAdWjJU6gVu0S2NgZp6_secret_KMDTTk1pT0q9k61ZZE8CsL1bH',
    clientSecret: props.data,
  };

  // TODO:未決済のまま画面落ちしたらどうするかは要検討

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
          return_url: 'http://localhost:3000'
        }
      })
      console.log(error)
    }}>決済</button>
    </div>
    {/* <Elements stripe={stripePromise} options={options}> */}
      {/* <PaymentElement /> */}
    {/* </Elements> */}
    </>
  );
}