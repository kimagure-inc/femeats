import React, { useEffect, useState } from 'react';
import MyPage from '../../../layout/mypage';
import axios from 'axios';
import Layout from '../../../layout/Layout';
import { useRouter } from 'next/router';
import Confirmation from '../../components/modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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
          <table>
            <thead>
              <tr>
                <th>サービスの利用状況</th>
                <th>(停止・解約申込)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>サービスの解約</td>
                <td>解約中</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => Toggle()}>変更</button>
          <Confirmation
            show={modal}
            close={Toggle}
            comment={start}
            btName={startbt}
            submit={changeSub}
          />
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
                  fontSize: '16px',
                  fontWeight: '700',
                  marginTop: '32px',
                }}
              >
                お申し込み中のプラン
              </Box>

              <table>
                <thead>
                  <tr>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>契約プラン</td>
                    <td>{data.product.name}</td>
                  </tr>
                  <tr>
                    <td>金額(税込)</td>
                    <td>
                      {Number(data.product.price).toLocaleString()}円(税込)
                    </td>
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
                      <button onClick={() => stopTg()}>停止する</button>
                      <Confirmation
                        show={modal1}
                        close={stopTg}
                        comment={stop}
                        btName={name1}
                        submit={stopSub}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>サービスの解約</td>
                    <td>
                      <button onClick={() => cancelTg()}>解約する</button>
                      <Confirmation
                        show={modal2}
                        close={cancelTg}
                        comment={cancel}
                        btName={name2}
                        submit={cancelSub}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => Toggle()}>変更</button>
              <Confirmation
                show={modal}
                close={Toggle}
                comment={change}
                btName={name}
                submit={changeSub}
              />
            </>
          ) : (
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
                    <td>
                      {Number(data.product.price).toLocaleString()}円(税込)
                    </td>
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
                      <button onClick={() => restartTg()}>再開する</button>
                      <Confirmation
                        show={modal4}
                        close={restartTg}
                        comment={restart}
                        btName={name3}
                        submit={restartSub}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>サービスの解約</td>
                    <td>
                      <button onClick={() => cancelTg()}>解約する</button>
                      <Confirmation
                        show={modal2}
                        close={cancelTg}
                        comment={cancel}
                        btName={name2}
                        submit={cancelSub}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => Toggle()}>変更</button>
              <Confirmation
                show={modal}
                close={Toggle}
                comment={change}
                btName={name}
                submit={changeSub}
              />
            </>
          )}
        </>
      </MyPage>
    </Layout>
  );
}
