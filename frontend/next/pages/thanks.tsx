import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../layout/Layout';

const Thanks: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Layout>
        <div>ご購入ありがとうございました！</div>
        <button onClick={() => router.push('/login')}>TOP</button>
      </Layout>
    </>
  );
};

export default Thanks;
