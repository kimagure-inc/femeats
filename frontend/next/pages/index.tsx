import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Image from '../public/top_pc.png';
import resImage from '../public/top_sp.png';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
  const router = useRouter();
  const matches: boolean = useMediaQuery('(min-width:450px)');

  const Submit = () => {
    router.push('/questions');
  };

  return (
    <>
      <>
        {matches ? (
          <>
            <Box sx={{ position: 'content' }}>
              <Paper
                elevation={0}
                sx={{
                  backgroundImage: `url(${Image.src})`,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                }}
              >
                <Layout>
                  <Typography component='div'>
                    <Box
                      sx={{
                        my: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        marginTop: '180px',
                      }}
                    >
                      <Box
                        fontSize={12}
                        fontWeight={500}
                        sx={{
                          marginBottom: '48px',
                        }}
                      >
                        ※これは技術を身につけるために作成されたサンプルサイトです。実際に商品は届きません、ご了承ください。
                      </Box>
                      <Box
                        fontSize={36.6316}
                        fontWeight={700}
                        sx={{
                          marginBottom: '16px',
                        }}
                      >
                        食事からカラダをととのえる。
                        <br />
                        女性のためのレコメンドお弁当。
                      </Box>
                      <Box fontSize={24}>
                        あなたの状態に合わせたお弁当をおすすめします。
                        <br />
                        ホルモンバランスを整え、身体を温めて、血行を良くするこだわりのプランです。
                        <br />
                        メニューは毎週入れ替わるので、楽しく続けられます。
                      </Box>
                      <Button
                        sx={{
                          borderRadius: 16,
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          color: '#333333',
                          backgroundColor: '#FFF262',
                          top: 40,
                          width: '242px',
                          height: '48px',
                          '&:hover': {
                            background: '#FFF262',
                          },
                        }}
                        variant='contained'
                        onClick={Submit}
                      >
                        今すぐ診断する
                      </Button>{' '}
                    </Box>
                  </Typography>
                </Layout>
              </Paper>
            </Box>
          </>
        ) : (
          <>
            {' '}
            <Layout>
              <Box
                fontSize={14}
                fontWeight={500}
                sx={{
                  marginBottom: '24px',
                }}
              >
                ※これは技術を身につけるために作成されたサンプルサイトです。実際に商品は届きません、ご了承ください。
              </Box>
              <Paper
                elevation={0}
                sx={{
                  backgroundImage: `url(${resImage.src})`,
                  position: 'absolute',
                  width: 318,
                  height: 629,
                  left: 40,
                  top: 160,
                }}
              >
                <Box
                  sx={{
                    textAlign: 'left',
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '16px',
                    marginTop: '-17px',
                    marginLeft: '-8px',
                  }}
                >
                  食事からカラダを
                  <br />
                  ととのえる。
                  <br />
                  女性のための
                  <br />
                  レコメンドお弁当。
                </Box>
                <Box
                  sx={{
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '700',
                    marginLeft: '-8px',
                  }}
                >
                  あなたの状態に合わせた
                  <br />
                  お弁当をおすすめします。
                  <Box
                    sx={{
                      marginBottom: '16px',
                    }}
                  ></Box>
                  ホルモンバランスを整え、
                  <br />
                  身体を温めて、
                  <br />
                  血行を良くするこだわりのプランです。
                  <Box
                    sx={{
                      marginBottom: '16px',
                    }}
                  ></Box>
                  メニューは毎週入れ替わるので、
                  <br />
                  楽しく続けられます。
                </Box>
                <Box
                  sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: 16,
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#333333',
                      backgroundColor: '#FFF262',
                      '&:hover': {
                        background: '#FFF262',
                      },
                      width: '242px',
                      hight: '48px',
                      marginTop: '131px',
                    }}
                    variant='contained'
                    onClick={Submit}
                  >
                    今すぐ診断する
                  </Button>
                </Box>
              </Paper>
            </Layout>
          </>
        )}
      </>
    </>
  );
};

export default Home;
