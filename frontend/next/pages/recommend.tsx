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
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from '../styles/Home.module.css';

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
  const [isLoading, setLoading] = useState(false);
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
    'バランスのとれた食事が必要です！',
    'タンパク質やビタミンを取りましょう！',
    'カルシウムを取りましょう！',
    '鉄やビタミンCを取りましょう！',
  ];

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e));

    const signedIn = hasCookie('signedIn');
    const loginuser = () => {
      if (signedIn == true) {
        setAuth(true);
      }
    };
    loginuser();
  }, []);

  if (isLoading) return;

  return (
    <>
      <Layout auth={auth}>
        <Container maxWidth='lg'>
          <Stack spacing={2}>
            <StyledBox
              sx={{
                fontSize: '24px',
                fontWeight: '500',
                marginTop: '8px',
              }}
            >
              <span className={styles.marker}>
                {router.query.name}さんの診断結果
              </span>
            </StyledBox>
            <StyledBox
              sx={{
                fontSize: '15px',
                fontWeight: '600',
              }}
            >
              {comment[categoryNum]}
            </StyledBox>
            <StyledBox
              sx={{
                fontSize: '16px',
                fontWeight: '700',
                marginTop: 2,
              }}
            >
              <span className={styles.marker}>おすすめプラン</span>
            </StyledBox>
          </Stack>
          {products ? (
            <>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Item sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}>
                  <Image
                    src={products[0].imgUrl}
                    width={134}
                    height={147}
                    style={{ alignSelf: 'center', borderRadius: 8 }}
                  />
                </Item>
                <Item
                  sx={{
                    mr: 10,
                    marginLeft: 80,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <Image
                    src={products[0].imgUrl}
                    width={240}
                    height={288}
                    style={{ alignSelf: 'center', borderRadius: 8 }}
                  />
                </Item>
                <Item
                  width={326}
                  sx={{
                    maxWidth: '326',
                    justifyContent: 'center',
                  }}
                >
                  <StyledBox
                    sx={{
                      fontSize: '24px',
                      fontWeight: '700',
                      textAlign: 'left',
                      marginTop: '8px',
                    }}
                  >
                    {category ? category.name : ''} plan
                  </StyledBox>
                  <StyledBox
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'left',
                      marginTop: '16px',
                    }}
                  >
                    {products ? products[0].introduction : ''}
                  </StyledBox>
                </Item>
              </Stack>
            </>
          ) : (
            <Box></Box>
          )}
          {products ? (
            <>
              {!auth ? (
                <>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{
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
                        sx={{
                          backgroundColor: '#FFF',
                        }}
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
                        sx={{
                          backgroundColor: '#FFF',
                        }}
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
                      <Button
                        sx={{
                          borderRadius: 16,
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          backgroundColor: '#FFFFFF',
                          color: '#333333',
                          width: 242,
                          height: 48,
                          marginTop: 4,
                          '&:hover': {
                            color: 'primary.main',
                            background: '#FFF262',
                          },
                        }}
                        variant='contained'
                      >
                        購入する
                      </Button>
                    </Link>
                  </StyledBox>
                </>
              ) : (
                // ログインユーザー:マイページに遷移して契約変更
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
                    <Button
                      sx={{
                        borderRadius: 16,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        backgroundColor: '#FFFFFF',
                        color: '#333333',
                        width: 242,
                        height: 48,
                        marginTop: 4,
                        '&:hover': {
                          color: 'primary.main',
                          background: '#FFF262',
                        },
                      }}
                      variant='contained'
                      color='primary'
                    >
                      契約変更する
                    </Button>
                  </Link>
                </StyledBox>
              )}
            </>
          ) : (
            <></>
          )}
          <StyledBox>
            <Link href='/questions'>
              <Button
                sx={{
                  borderRadius: 16,
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  backgroundColor: '#333333',
                  width: 242,
                  height: 48,
                  marginTop: 2,
                  '&:hover': {
                    color: 'primary.main',
                    background: '#FFF262',
                  },
                }}
                variant='contained'
                color='primary'
              >
                もう1度診断する
              </Button>
            </Link>
          </StyledBox>
        </Container>
      </Layout>
    </>
  );
}
