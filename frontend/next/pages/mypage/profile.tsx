import React, { useEffect, useState } from 'react';
import MyPage from '../../layout/mypage';
import Layout from '../../layout/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';

type FormData = {
  name: string;
  email: string;
  address1: string;
  address2: string;
  address3: string;
  postcode: string;
  telPhone: string;
};

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState();
  const [id, setId] = useState('');
  const [auth, setAuth] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [tel, setTel] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setId(res.data.id);
        setLoading(false);
        setName(res.data.name);
        setEmail(res.data.email);
        setAddress1(res.data.address1);
        setAddress2(res.data.address2);
        setAddress3(res.data.address3);
        setPostcode(res.data.postcode);
        setTel(res.data.telPhone);
      })
      .catch((e) => {
        console.log(e);
        setAuth(false);
        router.push('/login');
      });
  }, []);

  const Submit = async (e: any) => {
    e.preventDefault();
    console.log('id', id);

    // axios
    //   .patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`, formData, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log('success');
    //     console.log(res);
    //     alert('保存しました');
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    color: 'primary',
    backgroundColor: '#FFFFFF',
    width: '350px',
    marginBottom: '32px',
    '@media screen and (min-width:600px)': {
      width: 432,
    },
  }));

  return (
    <>
      <Layout auth={auth}>
        <MyPage>
          <StyledBox>
            <Box
              sx={{
                fontSize: '16px',
                fontWeight: '700',
                marginTop: '32px',
              }}
            >
              お客様情報の変更
            </Box>
            {/* <FormControl sx={{ m: 1, minWidth: 288 }}> */}
            <Box
              component='form'
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete='off'
            >
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  marginTop: '24px',
                  marginBottom: '8px',
                }}
              >
                お名前
              </FormHelperText>
              <TextField
                type='text'
                name='name'
                value={name}
                onBlur={(e) => setName(e.target.value)}
              />
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  marginTop: '24px',
                  marginBottom: '8px',
                }}
              >
                メールアドレス
              </FormHelperText>
              <TextField
                type='text'
                name='email'
                value={email}
                onBlur={(e) => setEmail(e.target.value)}
              />
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                }}
              >
                ご住所（お届け先）
              </FormHelperText>
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px',
                }}
              >
                郵便番号
              </FormHelperText>
              <TextField
                value={postcode}
                name='postcode'
                onChange={(e) => setPostcode(e.target.value)}
              />
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginTop: '8px',
                  marginBottom: '8px',
                }}
              >
                都道府県
              </FormHelperText>
              <TextField
                type='text'
                name='address1'
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginTop: '8px',
                  marginBottom: '8px',
                }}
              >
                市区町村番地・号
              </FormHelperText>
              <TextField
                type='text'
                name='address2'
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginTop: '8px',
                  marginBottom: '8px',
                }}
              >
                建物名・号室
              </FormHelperText>
              <TextField
                type='text'
                name='address3'
                value={address3}
                onChange={(e) => setAddress3(e.target.value)}
              />
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginTop: '8px',
                  marginBottom: '8px',
                }}
              >
                お電話番号
              </FormHelperText>
              <TextField
                type='tel'
                value={tel}
                name='telPhone'
                onChange={(e) => setTel(e.target.value)}
              />

              {/*             
            </FormControl> */}
            </Box>
          </StyledBox>
          <Box
            sx={{
              width: 350,
              display: 'flex',
              justifyContent: 'center',
              '@media screen and (min-width:600px)': {
                width: '432px',
              },
            }}
          >
            <Button
              sx={{
                borderRadius: 16,
                fontSize: '0.875rem',
                fontWeight: '700',
                backgroundColor: '#333333',
                width: '242px',
                height: '48px',
              }}
              variant='contained'
              color='primary'
              onClick={Submit}
            >
              保存
            </Button>
          </Box>
          {/* </Grid> */}
        </MyPage>
      </Layout>
    </>
  );
}
