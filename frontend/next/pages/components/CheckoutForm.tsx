import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

export default function CheckoutForm(props: any) {
  const stripe = useStripe();
  const elements = useElements();

  let delDate = new Date(props.deliveryDate);
  delDate.setDate(delDate.getDate() + 1);

  let orderDate = new Date(props.deliveryDate);
  orderDate.setDate(orderDate.getDate() - 4);

  const data = {
    userData: {
      name: props.userName,
      postcode: props.postcode,
      address1: props.address1,
      address2: props.address2,
      address3: props.address3,
      telPhone: props.tel,
      stripe_sub_id: props.stripe_sub_id,
    },
    contractData: {
      product_id: Number(props.product_id),
      user_id: Number(props.user_id),
      timezone_id: Number(props.delTime),
      deliveryDate: delDate,
      status_id: 1,
      orderDate: orderDate,
    },
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'primary',
    backgroundColor: '#FFFFFF',
    width: '350px',
    marginBottom: '32px',
    '@media screen and (min-width:600px)': {
      width: '432px',
    },
  }));

  return (
    <>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        direction='column'
      >
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
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            direction='column'
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
                      {Number(props.price).toLocaleString()}円
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
                      {Number(props.price + 500).toLocaleString()}円
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </StyledBox>
        <Button
          onClick={async (e) => {
            e.preventDefault();
            if (!elements || !stripe) return;
            axios
              .post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe/user/${props.user_id}`,
                data
              )
              .then((res: AxiosResponse) => {
                console.log(res);
              })
              .catch((e: AxiosError<{ error: string }>) => console.log(e));
            const { error } = await stripe.confirmPayment({
              elements,
              confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thanks`,
              },
            });
            console.log(error);
          }}
          sx={{
            borderRadius: 16,
            fontSize: '16px',
            fontWeight: '700',
            color: '#333333',
            backgroundColor: '#FFF262',
            width: '242px',
            height: '48px',
            '&:hover': {
              background: '#FFF262',
            },
            '@media screen and (min-width:600px)': {
              width: '168px',
              height: '32px',
              fontSize: '12px',
            },
          }}
          variant='contained'
        >
          購入を確定する
        </Button>
      </Grid>
    </>
  );
}
