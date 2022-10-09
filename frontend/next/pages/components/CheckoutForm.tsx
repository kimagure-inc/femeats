import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function CheckoutForm(props: any) {
  const stripe = useStripe();
  const elements = useElements();

  let orderDate = new Date(props.deliveryDate);
  orderDate.setDate(orderDate.getDate() - 5);

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
      deliveryDate: new Date(props.deliveryDate),
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
              marginBottom: '48px',
            }}
          >
            <PaymentElement />
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
            <div>小計:</div>
            <div>{Number(props.price).toLocaleString()}円</div>
            <div>送料:</div>
            <div>500円</div>
            <div>総合計（税込）:</div>
            <div>{Number(props.price + 500).toLocaleString()}円</div>
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
            fontSize: '0.875rem',
            fontWeight: '700',
            top: 40,
            color: '#333333',
            backgroundColor: '#FFF262',
          }}
          variant='contained'
        >
          購入を確定する
        </Button>
      </Grid>
    </>
  );
}
