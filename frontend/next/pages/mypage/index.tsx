import React, { useEffect, useState } from 'react';
import MyPage from '../../layout/mypage';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Box from '@mui/material/Box';

type userData = {};

export default function Top() {
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [contract, setContract] = useState(false);
  const [stopState, setStopState] = useState(false);
  const status = (condition: string) => {
    if (condition == '2') {
      setStopState(true);
    } else if (condition == '3') {
      setContract(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/contract`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        status(res.data.status_id);
      })
      .catch((e) => {
        console.log(e);
        router.push('/login');
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

  if (contract)
    return (
      <Layout>
        <MyPage>
          <table>
            <thead>
              <tr>
                <th>ご契約プラン情報</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>契約プラン</td>
                <td>解約しています</td>
              </tr>
            </tbody>
          </table>
        </MyPage>
      </Layout>
    );

  return (
    <Layout auth={true}>
      <MyPage>
        <>
          {console.log(data)}
          {!stopState ? (
            <>
              <Box sx={{ padding: '16px' }}>
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
                <Image src={data.product.imgUrl} width={272} height={147} />
              </Box>
            </>
          ) : (
            <>
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
                    <td>停止中</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </>
      </MyPage>
    </Layout>
  );
}
