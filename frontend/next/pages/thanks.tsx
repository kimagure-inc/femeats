import React from 'react';
import type { NextPage } from 'next'
import { useRouter } from "next/router";

const Thanks: NextPage = () => {
  const router = useRouter();

  // TODO:遷移先確認
  return (
    <>
      <div>ご購入ありがとうございました！</div>
      <button onClick={() => router.push("/login")}>
        マイページTOP
      </button>
    </>
  )
}

export default Thanks;