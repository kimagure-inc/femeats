import Link from 'next/link';
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
  margin: 16,
  borderRadius: 2,
  fontWeight: '600',
  '&:hover': {
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
        console.log('Posting data', res);
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
    }, 3 * 1000);
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
                <h2>パーソナライズ診断</h2>
                <p>お名前を教えてください（ニックネーム可）</p>
                <StyledTextField
                  id='outlined-basic'
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
                    '&:hover': {
                      color: 'primary.main',
                      background: '#FFF262',
                    },
                  }}
                  onClick={startBtn}
                  variant='contained'
                  color='primary'
                >
                  診断をはじめる
                </Button>
              </Box>
            ) : waitingResult ? (
              <Box
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginTop: '16px',
                }}
              >
                {userName}さんにおすすめのプランを診断中・・・
              </Box>
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
                    <StyledBox
                      sx={{
                        fontSize: '15px',
                        fontWeight: '600',
                      }}
                    >
                      {questions[currentQuestion].question}
                    </StyledBox>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    // my: 4,
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
                      <SelectBtn
                        sx={{
                          borderRadius: 16,
                          fontSize: '0.875rem',
                          fontWeight: '700',
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
                      </SelectBtn>
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
