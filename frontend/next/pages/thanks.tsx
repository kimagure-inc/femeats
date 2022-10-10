import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../layout/Layout';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#333333',
}));

const Thanks: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Layout>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          direction='column'
        >
          <Grid item xs={12}>
            <StyledBox
              sx={{
                fontSize: '24px',
                fontWeight: '700',
                marginTop: '24px',
              }}
            >
              ご購入ありがとうございました
            </StyledBox>
          </Grid>
          <Button
            sx={{
              borderRadius: 16,
              fontSize: '0.875rem',
              fontWeight: '700',
              top: 40,
              backgroundColor: "#333333",
              width: '242px',
              height: '48px',
            }}
            onClick={() => router.push('/login')}
            variant='contained'
            color='primary'
          >
            TOP
          </Button>
        </Grid>
      </Layout>
    </>
  );
};

export default Thanks;