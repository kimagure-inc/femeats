import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";

export default function CheckoutForm(props: any) {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  console.log("props :", props);
  const data = {
    userData: {
      name: props.userName,
      postcode: props.postcode,
      address1: props.address1,
      address2: props.address2,
      address3: props.address3,
      telPhone: props.tel,
      stripe_sub_id : "sub_1Lp16YAdWjJU6gVu2p2hGRmJ",
      stripe_cus_id: "cus_MZGy9gMJbNxUrl"
    },
    contractData: {
      product_id: 1,
      user_id: 2,
      timezone_id: 2,
      deliveryDate: "2022-10-02T00:00:00.000Z",
      status_id: 1,
      orderDate: "2022-10-07T00:00:00.000Z"
    },
    stripeCusData: {
      name: props.userName,
    },
    // stripeSubData: {
    //   billing_cycle_anchor: 1665400607
    // }
  }

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
          const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thanks`,
            },
          });
          axios
          .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${router.query.pid}`)
          .then((res: AxiosResponse) => {
          console.log(res);
          })
          .catch((e: AxiosError<{ error: string }>) => console.log(e));
          console.log(error);
        }}
      >
        購入を確定する
      </button>
    </>
  );
}
