import React, { SyntheticEvent, useState } from 'react';
// import axios, { AxiosResponse, AxiosError } from "axios";
import Layout from '../layout/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { setCookie } from 'cookies-next';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`, data, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setCookie('signedIn', 'true');
        router.push('/mypage');
      })
      .catch(function (error) {
        console.log(error);
        alert('メールアドレスまたはパスワードを確認してください');
      });
  };

  return (
    <>
      <Layout>
        <h3>ログイン</h3>
        <form>
          <div>
            <label>メールアドレス</label>
            <input
              type='text'
              placeholder='mail@example.com'
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
            />
          </div>
          <div>
            <label>パスワード</label>
            <input
              type='password'
              placeholder='半角英数字で８文字以上'
              onInput={(e) => setPassword(e.currentTarget.value)}
              required
            />
          </div>

          <button type='submit' onClick={Submit}>
            ログイン
          </button>
        </form>
        <div>
          femeatsのアカウントを作成する場合は
          <Link href='questions'>パーソナライズ診断</Link>から
        </div>
      </Layout>
    </>
  );
}
