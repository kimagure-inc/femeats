import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Layout from '../layout/Layout';
import { hasCookie } from 'cookies-next';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import styled from '@mui/system/styled';
import Grid from '@mui/material/Grid';

type questions = {
  questions: question[];
};

type question = {
  id: number;
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  choice5: string;
};

type allAnswer = number[];

const StyledTextField = styled(TextField, {
  name: 'StyledTextField',
})({
  backgroundColor: 'white',
  position: 'absolute',
  width: 288,
  marginTop: 64,
  '& .MuiInputBase-root': {
    height: 40,
  },
});

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#333333',
}));

const SelectBtn = styled(Button, {
  name: 'SelectBtn',
})({
  width: 360,
  height: 48,
  margin: 8,
  borderRadius: 8,
  fontWeight: '600',
  backgroundColor: '#FFFFFF',
  '&:hover': {
    background: '#FFFFFF',
  },
  '&:active': {
    background: '#FFF262',
  },
});

export default function App(props: questions) {
  const questions: question[] = props.questions;
  const router = useRouter();
  const [isStart, setIsStart] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finishAnswer, setFinishAnswer] = useState(false); // Q5を答えたらtrueに変わる
  const [waitingResult, setWaitingResult] = useState(false); //Trueになったら診断中の画面に変わる
  const [allAnswer, setAllAnswer] = useState<allAnswer>([]); //ユーザーの回答をQ1〜Q5まで溜めておく
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const signedIn = hasCookie('signedIn');
    const loginuser = () => {
      if (signedIn == true) {
        setAuth(true);
      }
    };
    loginuser();
  }, []);

  const startBtn = () => {
    setIsStart(true);
  };

  const handleAnswerOptionClick = (userAnswer: number) => {
    setAllAnswer([...allAnswer, userAnswer]);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion); // 次の質問を表示
    } else {
      setFinishAnswer(true); // Q5を答えたら送信ボタンを出現させる
    }
  };

  const submitBtn = () => {
    setWaitingResult(true); // 診断中の画面を表示
    postAnswer(); // APIに回答送信後、結果ページへ遷移させる
  };

  const postAnswer = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/personalize`, {
        data: allAnswer,
      })
      .then((res: AxiosResponse) => {
        showResult(res.data);
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e.message, 500));
  };

  const showResult = (recommendCategory: number) => {
    setTimeout(() => {
      router.push(
        {
          pathname: '/recommend',
          query: { name: userName, category: recommendCategory },
        },
        'recommend'
      );
    }, 5 * 1000);
  };

  return (
    <>
      <Layout auth={auth}>
        <Container maxWidth='lg'>
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!isStart ? (
              <Box
                sx={{
                  my: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '14px',
                }}
              >
                <h2>診断をはじめる</h2>
                <p>ニックネームを入力してください</p>
                <StyledTextField
                  id='outlined-basic'
                  autoComplete='off'
                  variant='outlined'
                  value={userName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserName(e.currentTarget.value)
                  }
                />
                <br />
                <br />
                <Button
                  sx={{
                    borderRadius: 16,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    top: 40,
                    backgroundColor: '#333333',
                    width: 242,
                    height: 48,
                    '&:hover': {
                      color: 'primary.main',
                      background: '#FFF262',
                    },
                  }}
                  onClick={startBtn}
                  variant='contained'
                  color='primary'
                >
                  送信
                </Button>
              </Box>
            ) : waitingResult ? (
              <Container maxWidth='lg'>
                <Box
                  sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                >
                  <Box
                    sx={{
                      mr: 2,
                      position: 'absolute',
                      top: '10%',
                      right: '50%',
                      display: { xs: 'block', sm: 'none' },
                    }}
                  >
                    <Image
                      src='/left.png'
                      width={200}
                      height={120}
                      className={styles.fuwafuwa}
                    />
                  </Box>
                  <Box
                    sx={{
                      mr: 2,
                      position: 'absolute',
                      top: '20%',
                      right: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    <Image
                      src='/left.png'
                      width={200}
                      height={120}
                      className={styles.fuwafuwa}
                    />
                  </Box>
                  <Box
                    sx={{
                      fontSize: '16px',
                      fontWeight: '700',
                      marginTop: '96px',
                      display: { xs: 'block', sm: 'none' },
                    }}
                  >
                    {userName}さんに
                    <br />
                    おすすめのプランを診断中
                  </Box>
                  <Box
                    sx={{
                      fontSize: '16px',
                      fontWeight: '700',
                      marginTop: '80px',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {userName}さんにおすすめのプランを診断中
                  </Box>
                  <Box
                    sx={{
                      mr: 2,
                      position: 'absolute',
                      top: '55%',
                      right: '5%',
                      display: { xs: 'block', sm: 'none' },
                    }}
                  >
                    <Image
                      src='/right.png'
                      width={180}
                      height={120}
                      className={styles.fuwafuwa}
                    />
                  </Box>
                  <Box
                    sx={{
                      mr: 2,
                      position: 'absolute',
                      top: '45%',
                      left: '65%',
                      transform: 'translate(-50%, -50%)',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    <Image
                      src='/right.png'
                      width={180}
                      height={120}
                      className={styles.fuwafuwa}
                    />
                  </Box>
                </Box>
              </Container>
            ) : (
              <>
                <Box
                  sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignQuestions: 'center',
                    fontSize: '14px',
                  }}
                >
                  <Grid
                    container
                    sx={{
                      alignItems: 'center',
                      justify: 'center',
                    }}
                  >
                    <Grid item xs={4} md={4}>
                      <Image src='/left.png' width={150} height={90} />
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Stack spacing={1}>
                        <StyledBox
                          sx={{
                            fontSize: '24px',
                            fontWeight: '700',
                          }}
                        >
                          Question
                        </StyledBox>
                        <StyledBox
                          sx={{
                            fontSize: '24px',
                            fontWeight: '700',
                          }}
                        >
                          0{currentQuestion + 1}
                        </StyledBox>
                      </Stack>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Image src='/right.png' width={140} height={96} />
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    fontSize: '15px',
                    fontWeight: '600',
                    marginBottom: '32px',
                  }}
                >
                  {questions[currentQuestion].question}
                </Box>
                {/* </Stack> */}
                {/* </Box> */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '14px',
                  }}
                >
                  <SelectBtn
                    variant='contained'
                    color='secondary'
                    onClick={() => handleAnswerOptionClick(1)}
                  >
                    {questions[currentQuestion].choice1}
                  </SelectBtn>
                  <SelectBtn
                    variant='contained'
                    color='secondary'
                    onClick={() => handleAnswerOptionClick(2)}
                  >
                    {questions[currentQuestion].choice2}
                  </SelectBtn>
                  <SelectBtn
                    variant='contained'
                    color='secondary'
                    onClick={() => handleAnswerOptionClick(3)}
                  >
                    {questions[currentQuestion].choice3}
                  </SelectBtn>
                  <SelectBtn
                    variant='contained'
                    color='secondary'
                    onClick={() => handleAnswerOptionClick(4)}
                  >
                    {questions[currentQuestion].choice4}
                  </SelectBtn>
                  <br />
                  <br />
                  {finishAnswer ? (
                    <>
                      <Button
                        sx={{
                          borderRadius: 16,
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          marginTop: 1,
                          backgroundColor: '#333333',
                          width: 242,
                          height: 48,
                          '&:hover': {
                            color: 'primary.main',
                            background: '#FFF262',
                          },
                        }}
                        onClick={submitBtn}
                        variant='contained'
                        color='primary'
                      >
                        診断結果を見る
                      </Button>
                    </>
                  ) : (
                    <Box></Box>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_BASE_URL}/questions`);

  return {
    props: {
      questions: await res.json(),
    },
  };
}
