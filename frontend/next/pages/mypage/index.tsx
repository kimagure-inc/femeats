import React, { useEffect, useState } from 'react';
import MyPage from '../../layout/mypage';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import { setRevalidateHeaders } from 'next/dist/server/send-payload';

type userData = {};

export default function Top() {
  const router = useRouter();
  const [data, setData] = useState();
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
      })
      .catch((e) => {
        console.log(e);
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
  const date = new Date(data.deliveryDate);
  const mt = date.getMonth() + 1;
  const dt = date.getDate();
  const dy = date.getDay();
  const weekChars = [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ];

  return (
    <Layout auth={true}>
      <MyPage>
        <>
          {console.log(data)}
          <table>
            <thead>
              <tr>
                <th>ご契約プラン情報</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>契約プラン</td>
                <td>{data.product.name}</td>
              </tr>
              <tr>
                <td>金額(税込)</td>
                <td>{Number(data.product.price).toLocaleString()}円</td>
              </tr>
              <tr>
                <td>配送サイクル</td>
                <td>{data.product.deliveryCycle}週間に１回</td>
              </tr>
              <tr>
                <td>次回配送予定日</td>
                <td>
                  {mt}月{dt}日{weekChars[dy]}
                </td>
                <td>{data.timezone.timezone}</td>
              </tr>
            </tbody>
          </table>
        </>
      </MyPage>
    </Layout>
  );
}
