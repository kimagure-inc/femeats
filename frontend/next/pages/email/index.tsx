import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";

export default function Auth(props: any) {
  const router = useRouter();
  const [status, setStates] = useState(false);
  // console.log('props :', props)
  // console.log('props.data :', props.data)
  // console.log('props.data.recommend.email :', props.data.recommend.email,)

  // ボタンクリックで顧客登録させる
  // 返り値のclient_secretを遷移先へ渡したい
  const handleClick = (props:any) => {
    // console.log('func-props :', props)
    const data = {
      email: props.data.recommend.email,
      product_id: props.data.recommend.product_id
    }
    console.log("data :", data)
    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe/cs`, data)
    .then((res) => {
      console.log(res);
      router.push({
        pathname: `/purchase`, // 遷移先のページ
        query: {data: res.data},
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      {console.log(props)}
      <h1>認証に成功しました</h1>
      <div>引き続き購入手続きを行なってください</div>
      <button onClick={()=>handleClick(props)}>購入手続き</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.query.token;
  const res = await axios.get(`${process.env.API_BASE_URL}/user/auth/${token}`);
  const data = res.data;
  return {
    props: {
      data: data,
    },
  };
};
