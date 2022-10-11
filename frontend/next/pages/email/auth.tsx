import Layout from '../../layout/Layout';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import styled from '@mui/system/styled';

export default function Sign() {
  const router = useRouter();

  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#333333',
  }));
  return (
    <>
      <Layout auth={false}>
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
              認証メールを送信しました
            </StyledBox>
          </Grid>
          <StyledBox
            sx={{
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            認証メールに記載されたURLから購入手続きに進んでください
          </StyledBox>
          <Button
            sx={{
              borderRadius: 16,
              fontSize: '16px',
              fontWeight: '700',
              top: 40,
              backgroundColor: '#333333',
              width: '242px',
              height: '48px',
            }}
            onClick={() => router.push('/')}
            variant='contained'
            color='primary'
          >
            OK
          </Button>
        </Grid>
      </Layout>
    </>
  );
}
