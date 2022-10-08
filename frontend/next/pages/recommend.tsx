import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios, { AxiosResponse, AxiosError } from 'axios';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Layout from '../layout/Layout';
import { hasCookie } from 'cookies-next';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import styled from '@mui/system/styled';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type category = {
  id: number;
  name: string;
};

type product = {
  id: number;
  name: string;
  introduction: string;
  price: number;
  imgUrl: string;
};

const StyledBox = styled(Box)(({ theme }) => ({
  opacity: 1,
  textAlign: 'center',
  color: '#333333',
}));

const SelectBtn = styled(Button, {
  name: 'SelectBtn',
})({
  width: 176,
  height: 48,
  margin: 8,
  borderRadius: 2,
  fontWeight: '600',
  '&:hover': {
    background: '#FFF262',
  },
  variant: 'contained',
  color: 'secondary',
});

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  fontsize: 14;
`;

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: '#F2F2F2',
  padding: theme.spacing(1),
  textAlign: 'center',
}));

export default function recommend() {
  const router = useRouter();
  const [category, setCategory] = useState<category>();
  const [products, setProducts] = useState<product[]>();
  const [auth, setAuth] = useState(false);
  const [selectPlan, setSelectPlan] = useState('0');
  const [selectCycle, setSelectCycle] = useState('4');

  const planChange = (event: SelectChangeEvent) => {
    setSelectPlan(event.target.value);
  };

  const cycleChange = (event: SelectChangeEvent) => {
    setSelectCycle(event.target.value);
  };

  const categoryNum = Number(router.query.category) - 1;

  const comment = [
    'バランスの取れた食事が必要です！',
    'タンパク質やビタミンを取りましょう！',
    'カルシウムを取りましょう！',
    '鉄やビタミンCを取りましょう！',
  ];

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${router.query.category}`
      )
      .then((res: AxiosResponse) => {
        setCategory(res.data);
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e));

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/${router.query.category}`
      )
      .then((res: AxiosResponse) => {
        setProducts(res.data);
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e));

    const signedIn = hasCookie('signedIn');
    const loginuser = () => {
      if (signedIn == true) {
        setAuth(true);
      }
    };
    loginuser();
  }, [router.isReady, router.query.category]);

  console.log(category);
  console.log(products);
  console.log(auth);

  return (
    <>
      <Layout auth={auth}>
        <Container maxWidth='lg'>
          <Stack spacing={2}>
            <StyledBox
              sx={{
                fontSize: '24px',
                fontWeight: '700',
                marginTop: '24px',
              }}
            >
              {router.query.name}さんの診断結果
            </StyledBox>
            <StyledBox
              sx={{
                fontSize: '15px',
                fontWeight: '600',
              }}
            >
              {comment[categoryNum]}
            </StyledBox>
          </Stack>
          {products ? (
            <>
              <StyledBox>
                <Image
                  src={products[0].imgUrl}
                  width={320}
                  height={320}
                  style={{ alignSelf: 'center' }}
                />
              </StyledBox>
              <Stack spacing={1}>
                <StyledBox
                  sx={{
                    fontSize: '16px',
                    fontWeight: '700',
                  }}
                >
                  おすすめプラン
                </StyledBox>
                <StyledBox
                  sx={{
                    fontSize: '16px',
                    fontWeight: '700',
                  }}
                >
                  {category ? category.name : ''} plan
                </StyledBox>
                <StyledBox
                  sx={{
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {products ? products[0].introduction : ''}
                </StyledBox>
              </Stack>
            </>
          ) : (
            <Box></Box>
          )}
          {products ? (
            <>
              {!auth ? ( //新規の人だったら、プラン選択と配送サイクル選択をしてもらう
                <>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{
                      my: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FormControl sx={{ m: 1, minWidth: 288 }}>
                      <FormHelperText>契約プラン</FormHelperText>
                      <Select
                        value={selectPlan}
                        onChange={planChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value={0}>
                          {products[0].name}{' '}
                          {Number(products[0].price).toLocaleString()}
                          円（税込）
                        </MenuItem>
                        <MenuItem value={1}>
                          {products[1].name}{' '}
                          {Number(products[1].price).toLocaleString()}
                          円（税込）
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 288 }}>
                      <FormHelperText>配送サイクル</FormHelperText>
                      <Select
                        value={selectCycle}
                        onChange={cycleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value={4}>2週間ごと</MenuItem>
                        <MenuItem value={2}>3週間ごと</MenuItem>
                        <MenuItem value={0}>4週間ごと</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <StyledBox>
                    <Link
                      href={{
                        pathname: '/signup',
                        query: {
                          id: products[Number(selectPlan) + Number(selectCycle)]
                            .id,
                        },
                      }}
                      as='signup'
                    >
                      <SelectBtn
                        variant='contained'
                        color='secondary'
                        startIcon={<ShoppingCart />}
                        endIcon={<KeyboardArrowRight />}
                      >
                        購入手続きへ
                      </SelectBtn>
                    </Link>
                  </StyledBox>
                </>
              ) : (
                // ログインユーザーだったら、マイページに遷移してから契約変更してもらう
                <StyledBox>
                  <Link
                    href={{
                      pathname: '/mypage',
                      query: {
                        id: products[Number(selectPlan) + Number(selectCycle)]
                          .id,
                      },
                    }}
                    as='mypage'
                  >
                    <SelectBtn
                      variant='contained'
                      color='secondary'
                      startIcon={<ShoppingCart />}
                      endIcon={<KeyboardArrowRight />}
                    >
                      契約変更手続きへ
                    </SelectBtn>
                  </Link>
                </StyledBox>
              )}
            </>
          ) : (
            <></>
          )}
          <StyledBox>
            <Link href='/questions'>
              <SelectBtn
                variant='contained'
                color='secondary'
                startIcon={<KeyboardArrowLeft />}
              >
                もう1度診断する
              </SelectBtn>
            </Link>
          </StyledBox>
        </Container>
      </Layout>
    </>
  );
}
