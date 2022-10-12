import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

export default function ChangeoutForm({ price }) {
  const stripe = useStripe();
  const elements = useElements();

  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'primary',
    backgroundColor: '#FFFFFF',
    width: '350px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '32px',
    '@media screen and (min-width:600px)': {
      width: '432px',
    },
  }));

  return (
    <>
      {console.log(price)}
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      > */}
      <StyledBox>
        <Box
          sx={{
            fontSize: '16px',
            fontWeight: '700',
            marginTop: '32px',
          }}
        >
          支払い情報
        </Box>
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: '700',
            marginTop: '8px',
            marginBottom: '24px',
          }}
        >
          クレジットカード情報
        </Box>
        <Box
          sx={{
            marginLeft: '16px',
            marginRight: '16px',
          }}
        >
          <Box
            sx={{
              marginBottom: '48px',
            }}
          >
            <PaymentElement />
          </Box>
        </Box>
      </StyledBox>
      <StyledBox>
        <Box
          sx={{
            fontSize: '16px',
            fontWeight: '700',
            marginTop: '32px',
            marginBottom: '24px',
          }}
        >
          金額
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            direction: 'column',
          }}
        >
          <TableContainer
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '48px',
            }}
          >
            <Table sx={{ minWidth: 300 }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      border: 'none',
                    }}
                  >
                    小計:
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      border: 'none',
                    }}
                  >
                    {Number(price).toLocaleString()}円
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>送料:</TableCell>
                  <TableCell align='right'>500円</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: '700',
                      border: 'none',
                    }}
                  >
                    総合計(税込):
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      fontWeight: '700',
                      border: 'none',
                    }}
                  >
                    {Number(price + 500).toLocaleString()}円
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </StyledBox>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 700,
          mb: '16px',
          '@media screen and (min-width:600px)': {
            width: '432px',
          },
        }}
      >
        <Button
          sx={{
            borderRadius: 16,
            fontWeight: '700',
            fontSize: '0.875rem',
            width: '242px',
            height: '48px',
            '&:hover': {
              color: 'primary.main',
              background: '#FFF262',
            },
            '@media screen and (min-width:600px)': {
              width: '242px',
              height: '48px',
            },
          }}
          variant='contained'
          color='primary'
          onClick={async (e) => {
            e.preventDefault();
            if (!elements || !stripe) return;
            const { error } = await stripe
              .confirmPayment({
                elements,
                confirmParams: {
                  return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/mypage/`,
                },
              })
              .then((res) => {
                alert('変更を保存しました');
              });
            console.log(error);
          }}
        >
          確定
        </Button>
      </Box>
      {/* </Box> */}
    </>
  );
}
