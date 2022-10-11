import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Image from '../public/bg_femeats.jpg';
import resImage from '../public/Frame.png';
import Paper from '@mui/material/Paper';
import { Card, useMediaQuery } from '@mui/material';
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
                      }}
                    >
                      <Box fontSize={36.6316} fontWeight={700}>
                        食事からカラダをととのえる。
                      </Box>
                      <Box
                        textAlign='center'
                        fontSize={36.6316}
                        fontWeight={700}
                      >
                        女性のためのレコメンドお弁当。
                      </Box>
                      <Box fontSize={24}>
                        あなたの状態に合わせたお弁当をおすすめします。
                      </Box>
                      <Box fontSize={24}>
                        ホルモンバランスを整え、身体を温めて、血行を良くするこだわりのプランです。
                      </Box>
                      <Box fontSize={24}>
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
              <Paper
                sx={{
                  opacity: 0.4,
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
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'left',
                  }}
                >
                  <p>食事からカラダをととのえる。</p>
                  <p> 女性のためのレコメンドお弁当。</p>
                </Box>
                <div>
                  あなたの状態に合わせたお弁当をおすすめします。
                  ホルモンバランスを整え、身体を温めて、血行を良くするこだわりのプランです。メニューは毎週入れ替わるので、楽しく続けられます。
                </div>
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
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: '#333333',
                      backgroundColor: '#FFF262',
                      '&:hover': {
                        background: '#FFF262',
                      },
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
