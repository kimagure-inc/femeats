import React, { useEffect, useState } from 'react';
import MyPage from '../../layout/mypage';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Box from '@mui/material/Box';

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
          <Box
            sx={{
              width: 310,
              backgroundColor: '#ffffff',
              p: '16px',
              mt: '16px',
              '@media screen and (min-width:600px)': {
                width: '432px',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: 700,
                mb: '7px',
              }}
            >
              ご契約プラン情報
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
                fontWeight: 500,
                mb: '6px',
              }}
            >
              <div>契約プラン</div>
              <div> 解約しています</div>
            </Box>
          </Box>
        </MyPage>
      </Layout>
    );

  return (
    <Layout auth={true}>
      <MyPage>
        <>
          {!stopState ? (
            <>
              <Box
                sx={{
                  width: 310,
                  backgroundColor: '#ffffff',
                  p: '24px',
                  mt: '16px',
                  '@media screen and (min-width:600px)': {
                    width: 432,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '16px',
                    fontWeight: 700,
                    mb: '7px',
                  }}
                >
                  <div>ご契約プラン情報</div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '6px',
                  }}
                >
                  <div>契約プラン</div>
                  <div>{data.product.name}</div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '6px',
                  }}
                >
                  <div>金額(税込)</div>
                  <div>{Number(data.product.price).toLocaleString()}円</div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '6px',
                  }}
                >
                  <div>配送サイクル</div>
                  <div>{data.product.deliveryCycle}週間に１回</div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '6px',
                  }}
                >
                  <div>次回配送予定日</div>
                  <div>
                    {mt}月{dt}日{weekChars[dy]}
                  </div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '7px',
                  }}
                >
                  <div>{data.timezone.timezone}</div>
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    alt='femeats'
                    width={156}
                    height={168}
                    src={data.product.imgUrl}
                    style={{ alignSelf: 'center', borderRadius: 8 }}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  width: 310,
                  backgroundColor: '#ffffff',
                  p: '16px',
                  mt: '16px',
                  '@media screen and (min-width:600px)': {
                    width: 432,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '16px',
                    fontWeight: 700,
                    mb: '7px',
                  }}
                >
                  ご契約プラン情報
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '6px',
                  }}
                >
                  <div>契約プラン</div>
                  <div> {data.product.name}</div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '6px',
                  }}
                >
                  <div>金額(税込)</div>
                  <div>{Number(data.product.price).toLocaleString()}円</div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '6px',
                  }}
                >
                  <div>配送サイクル</div>
                  {data.product.deliveryCycle}週間に１回
                </Box>{' '}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '6px',
                  }}
                >
                  <div>次回配送予定日</div> <div>停止中</div>
                </Box>
              </Box>
            </>
          )}
        </>
      </MyPage>
    </Layout>
  );
}
