import React, { useEffect, useState } from 'react';
import MyPage from '../../../layout/mypage';
import axios from 'axios';
import Layout from '../../../layout/Layout';
import { useRouter } from 'next/router';

type userData = {};

export default function Info() {
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

  const Submit = () => {
    console.log('sub');
  };

  return (
    <Layout auth={true}>
      <MyPage>
        <>{console.log(data)}</>
        <>
          <table>
            <thead>
              <tr>
                <th>お申し込み中のプラン</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>契約プラン</td>
                <td>{data.product.name}</td>
              </tr>
              <tr>
                <td>金額(税込)</td>
                <td>{Number(data.product.price).toLocaleString()}円(税込)</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>お届けサイクル</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>サイクル</td>
                <td>{data.product.deliveryCycle}週間おき</td>
                <td>{weekChars[dy]}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>サービスの利用状況</th>
                <th>(停止・解約申込)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>配送の一時停止</td>
                <td>
                  <button>停止する</button>
                </td>
              </tr>
              <tr>
                <td>サービスの解約</td>
                <td>
                  <button>解約する</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={Submit}>変更</button>
        </>
      </MyPage>
    </Layout>
  );
}
