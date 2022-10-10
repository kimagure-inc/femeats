import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Grid from '@mui/material/Grid';

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

const Product = (props: any) => {
  return (
    <>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        direction='column'
      >
        <Grid item xs={12}>
          <StyledBox>
            <Box
              sx={{
                fontSize: '16px',
                fontWeight: '700',
                marginTop: '32px',
              }}
            >
              商品情報
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                fontWeight: '700',
                marginTop: '24px',
              }}
            >
              <div>{props.productName}</div>
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                marginTop: '8px',
              }}
            >
              <div>{Number(props.price).toLocaleString()}円（税込）</div>
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                marginTop: '8px',
                marginBottom: '16px',
              }}
            >
              <div>{props.deliveryCycle}週間に1回</div>
            </Box>
            <Box
              sx={{
                marginBottom: '48px',
              }}
            >
              {props.img && <Image src={props.img} width={196} height={216} />}
            </Box>
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
