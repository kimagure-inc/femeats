import React, { useEffect, useState } from 'react';
import MyPage from '../../../layout/mypage';
import axios from 'axios';
import Layout from '../../../layout/Layout';
import { useRouter } from 'next/router';
import Confirmation from '../../components/modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { fontSize, fontStyle } from '@mui/system';

type userData = {};

export default function Info() {
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [stopState, setStopState] = useState(false);
  const [contract, setContract] = useState(false);

  const change: string =
    '変更するには現行契約の解約が必要ですがよろしいですか？';
  const cancel: string = '契約を解約します。よろしいですか？';
  const start: string = '再契約をします。よろしいですか？';
  const stop: string = '配送を停止します。よろしいですか？';
  const restart: string = '配送を再開します。よろしいですか？';
  const name: string = '変更';
  const name1: string = '停止する';
  const name2: string = '解約する';
  const name3: string = '再開する';
  const startbt: string = 'はい';

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
        status(res.data.status_id);
        setLoading(false);
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

  const Toggle = () => {
    setModal(!modal);
  };
  const cancelTg = () => {
    setModal2(!modal2);
  };
  const stopTg = () => {
    setModal1(!modal1);
  };

  const restartTg = () => {
    setModal4(!modal4);
  };
  const postData = {
    id: data.user.stripe_sub_id,
    userId: data.id,
  };

  const stopSub = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stop`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setStopState(true);
        setModal1(!modal1);
        alert('配送を停止しました');
      })
      .catch((e) => {
        console.log(e);
      });
    console.log('配送を停止しました');
  };
  const cancelSub = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/cancel`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setModal2(!modal2);
        alert('解約しました');
        router.push('/mypage');
      })
      .catch((e) => {
        console.log(e);
      });
    console.log('解約しました');
  };
  const restartSub = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/restart`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setStopState(false);
        setModal4(!modal4);
        alert('配送を再開しました');
      })
      .catch((e) => {
        console.log(e);
      });
    console.log('再開');
    close();
  };

  const changeSub = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/cancel`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    router.push('/mypage/info/contract');
  };

  if (contract)
    return (
      <Layout>
        <MyPage>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Box
              sx={{
                width: 350,
                backgroundColor: '#ffffff',
                p: '40px',
                mt: '16px',
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                  mb: '16px',
                }}
              >
                サービスの利用状況 <div>(停止・解約申込)</div>
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
                <div>サービスの解約</div>
                <div>解約中</div>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{
                  borderRadius: 16,
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  backgroundColor: '#333333',
                  width: '242px',
                  height: '48px',
                }}
                variant='contained'
                color='primary'
                onClick={() => Toggle()}
              >
                変更
              </Button>
              <Confirmation
                show={modal}
                close={Toggle}
                comment={start}
                btName={startbt}
                submit={changeSub}
              />
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
                sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
              >
                <Box
                  sx={{
                    width: 350,
                    backgroundColor: '#ffffff',
                    p: '40px',
                    mt: '16px',
                    '@media screen and (min-width:600px)': {
                      width: '432px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: 700,
                      mb: '16px',
                    }}
                  >
                    お申し込み中のプラン
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
                    }}
                  >
                    <div>金額(税込)</div>
                    <div>
                      {' '}
                      {Number(data.product.price).toLocaleString()}円(税込)
                    </div>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 350,
                    backgroundColor: '#ffffff',
                    p: '40px',
                    '@media screen and (min-width:600px)': {
                      width: '432px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: 700,
                      mb: '16px',
                    }}
                  >
                    お届けサイクル
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    <div>サイクル</div>
                    <div>
                      {data.product.deliveryCycle}週間おき{''}
                      {''} {weekChars[dy]}
                    </div>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 350,
                    backgroundColor: '#ffffff',
                    p: '32px',
                    '@media screen and (min-width:600px)': {
                      width: '432px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: 700,
                      mb: '16px',
                    }}
                  >
                    サービスの利用状況 <div>(停止・解約申込)</div>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: 500,
                      mb: '16px',
                    }}
                  >
                    <div>配送の一時停止</div>

                    <Button
                      sx={{
                        borderRadius: 16,
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: '#333333',
                        width: '80px',
                        height: '28px',
                      }}
                      variant='contained'
                      color='primary'
                      onClick={() => stopTg()}
                    >
                      停止する
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {' '}
                    <div>サービスの解約</div>
                    <Confirmation
                      show={modal1}
                      close={stopTg}
                      comment={stop}
                      btName={name1}
                      submit={stopSub}
                    />
                    <Button
                      sx={{
                        borderRadius: 16,
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: '#333333',
                        width: '80px',
                        height: '28px',
                      }}
                      variant='contained'
                      color='primary'
                      onClick={() => cancelTg()}
                    >
                      解約する
                    </Button>
                  </Box>
                  <Confirmation
                    show={modal2}
                    close={cancelTg}
                    comment={cancel}
                    btName={name2}
                    submit={cancelSub}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: 16,
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      backgroundColor: '#333333',
                      width: '242px',
                      height: '48px',
                    }}
                    variant='contained'
                    color='primary'
                    onClick={() => Toggle()}
                  >
                    変更
                  </Button>
                  <Confirmation
                    show={modal}
                    close={Toggle}
                    comment={change}
                    btName={name}
                    submit={changeSub}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
              >
                <Box
                  sx={{
                    width: 350,
                    backgroundColor: '#ffffff',
                    p: '40px',
                    mt: '16px',
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: 700,
                      mb: '16px',
                    }}
                  >
                    お申し込み中のプラン
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
                    }}
                  >
                    <div>金額(税込)</div>
                    <div>
                      {' '}
                      {Number(data.product.price).toLocaleString()}円(税込)
                    </div>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 350,
                    backgroundColor: '#ffffff',
                    p: '40px',
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: 700,
                      mb: '16px',
                    }}
                  >
                    お届けサイクル
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    <div>サイクル</div>
                    <div>
                      {data.product.deliveryCycle}週間おき{''}
                      {''} {weekChars[dy]}
                    </div>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 350,
                    backgroundColor: '#ffffff',
                    p: '32px',
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: 700,
                      m: '8px',
                    }}
                  >
                    サービスの利用状況 <div>(再開・解約申込)</div>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: 500,
                      mb: '16px',
                    }}
                  >
                    <div>配送の一時停止</div>
                    <Button
                      sx={{
                        borderRadius: 16,
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: '#333333',
                        width: '80px',
                        height: '28px',
                      }}
                      variant='contained'
                      color='primary'
                      onClick={() => restartTg()}
                    >
                      再開する
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: 500,
                      mb: '16px',
                    }}
                  >
                    <div>サービスの解約</div>
                    <Confirmation
                      show={modal4}
                      close={restartTg}
                      comment={restart}
                      btName={name3}
                      submit={restartSub}
                    />

                    <Button
                      sx={{
                        borderRadius: 16,
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: '#333333',
                        width: '80px',
                        height: '28px',
                      }}
                      variant='contained'
                      color='primary'
                      onClick={() => cancelTg()}
                    >
                      解約する
                    </Button>
                  </Box>
                  <Confirmation
                    show={modal2}
                    close={cancelTg}
                    comment={cancel}
                    btName={name2}
                    submit={cancelSub}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: 16,
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      backgroundColor: '#333333',
                      width: '242px',
                      height: '48px',
                    }}
                    variant='contained'
                    color='primary'
                    onClick={() => Toggle()}
                  >
                    変更
                  </Button>
                  <Confirmation
                    show={modal}
                    close={Toggle}
                    comment={change}
                    btName={name}
                    submit={changeSub}
                  />
                </Box>
              </Box>
            </>
          )}
        </>
      </MyPage>
    </Layout>
  );
}
