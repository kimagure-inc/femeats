import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function ChangeoutForm({ price }) {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <>
      {console.log(price)}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PaymentElement />
        <Box
          sx={{
            width: 350,
            backgroundColor: '#ffffff',
            p: '16px',
            mt: '16px',
            '@media screen and (min-width:600px)': {
              width: '432px',
            },
          }}
        >
          <Box
            sx={{
              fontSize: '16px',
              fontWeight: '700',
              textAlign: 'center',
              mb: '16px',
            }}
          >
            金額
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              fontWeight: 500,
              mb: '6px',
            }}
          >
            <div>小計:</div>
            <div>{Number(price).toLocaleString()}円(税込)</div>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              fontWeight: 500,
              mb: '6px',
            }}
          >
            <div>送料:</div> <div>500円(税込)</div>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              fontWeight: 700,
              mb: '6px',
            }}
          >
            <div>合計　{Number(price + 500).toLocaleString()}円(税込)</div>
          </Box>
        </Box>
        <Button
          sx={{
            borderRadius: 16,
            fontSize: '0.875rem',
            fontWeight: '700',
            '&:hover': {
              color: 'primary.main',
              background: '#FFF262',
            },
            width: '242px',
            height: '48px',
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
          保存
        </Button>
      </Box>
    </>
  );
}
