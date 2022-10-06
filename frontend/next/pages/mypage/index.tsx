import React, { useEffect, useState } from "react";
import MyPage from "../../layout/mypage";
import axios from "axios";
import Layout from "../../layout/Layout";
import { useRouter } from "next/router";

export default function Top() {
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

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <Layout auth={auth}>
      <MyPage>
        <>
          {console.log(data)}
          <div>ご契約プラン情報</div>
          <ul>
            <div>契約プラン</div>
            <div>{data.product.name}</div>
          </ul>
          <ul>
            <div>金額</div>
            <div>{data.product.price}</div>
          </ul>
          <ul>
            <div>配送サイクル</div>
            <div>{data.deliveryCycle.cycle}週間に１回</div>
          </ul>
          <ul>
            <div>次回配送予定日</div>
            <div>{data.first_del_date}</div>
          </ul>
        </>
      </MyPage>
    </Layout>
  );
}
