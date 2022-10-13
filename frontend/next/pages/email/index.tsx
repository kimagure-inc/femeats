import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import Layout from '../../layout/Layout';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';

export default function Auth(props: any) {
  const router = useRouter();

  const handleClick = (props: any) => {
    const data = {
      email: props.data.recommend.email,
      product_id: props.data.recommend.product_id,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe/cs`, data)
      .then((res) => {
        router.push({
          pathname: `/purchase`,
          query: {
            cs: res.data.cs,
            sub: res.data.subscribe_id,
            uid: props.data.user.id,
            rid: props.data.recommend.id,
            pid: props.data.recommend.product_id,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#333333',
  }));

  return (
    <>
      <Layout>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          direction='column'
        >
          <StyledBox
            sx={{
              fontSize: '24px',
              fontWeight: '700',
              marginTop: '24px',
            }}
          >
            認証に成功しました
          </StyledBox>
          <StyledBox
            sx={{
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            以下から購入手続きに進んでください
          </StyledBox>
          <Button
            sx={{
              borderRadius: 16,
              fontSize: '16px',
              fontWeight: '700',
              top: 32,
              backgroundColor: '#333333',
              width: '242px',
              height: '48px',
              '@media screen and (min-width:600px)': {
                fontSize: '12px',
                width: '168px',
                height: '32px',
              },
            }}
            variant='contained'
            color='primary'
            onClick={() => handleClick(props)}
          >
            購入手続き
          </Button>
        </Grid>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.query.token;
  const res = await axios.get(`${process.env.API_BASE_URL}/user/auth/${token}`);
  const data = res.data;
  return {
    props: {
      data: data,
    },
  };
};
