import React, { useEffect, useState } from 'react';
import MyPage from '../../../layout/mypage';
import axios from 'axios';
import Layout from '../../../layout/Layout';
import { useRouter } from 'next/router';

type userData = {};

export default function Info() {
  const router = useRouter();
  const [data, setData] = useState();
  const [auth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/contract`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setAuth(true);
      })
      .catch((e) => {
        console.log(e);
        setAuth(false);
      });
  }, []);

  if (isLoading)
    return (
      <Layout>
        <MyPage>
          <p>Loading...</p>
        </MyPage>
      </Layout>
    );
  if (!data) return <p>No profile data</p>;

  return (
    <Layout auth={true}>
      <MyPage>
        <>{console.log(data)}</>
      </MyPage>
    </Layout>
  );
}
