import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";

export default function Auth(props: any) {
  const router = useRouter();
  const [status, setStates] = useState(false);

  return (
    <>
      {console.log(props)}
      <h1>認証に成功しました</h1>
      <div>引き続き購入手続きを行なってください</div>
      <button>購入手続き</button>
      <>{status}</>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.query.token;
  const res = await axios.get(`http://backend:3000/user/auth/${token}`);
  const data = res.data;
  return {
    props: {
      data: data,
    },
  };
};
