import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Image from 'next/image';
import bg from '../public/bg_femeats.jpg';

const Home = () => {
  const router = useRouter();
  const styling = {
    backgroundImage: `url('${bg.src}')`,
  };

  const Submit = () => {
    router.push('/questions');
  };

  return (
    <>
      <div>
        {/* <div style={styling}> */}
        <div>
          {/* <Image
            alt='femeats'
            src={`/bg_femeats.jpg`}
            layout={'fill'}
            objectFit={'cover'}
          /> */}

          <Layout>
            <div>食事からカラダを整える。女性のためのレコメンドお弁当。</div>
            <div>
              あなたの状態に合わせたお弁当をおすすめします。
              ホルモンバランスを整え、身体を温めて、血行を良くするこだわりのプランです。メニューは毎週入れ替わるので、楽しく続けられます。
            </div>
            <button onClick={Submit}>今すぐ診断する</button>
          </Layout>
        </div>
      </div>
    </>
  );
};

export default Home;
