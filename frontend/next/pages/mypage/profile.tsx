import React, { useEffect, useState } from 'react';
import MyPage from '../../layout/mypage';
import Layout from '../../layout/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
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

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address1: '',
    address2: '',
    address3: '',
    postcode: '',
    telPhone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        setFormData({
          name: res.data.name,
          email: res.data.email,
          address1: res.data.address1,
          address2: res.data.address2,
          address3: res.data.address3,
          postcode: res.data.postcode,
          telPhone: res.data.telPhone,
        });
      })
      .catch((e) => {
        console.log(e);
        setAuth(false);
        router.push('/login');
      });
  }, []);

  const Submit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    console.log('id', id);

    axios
      .patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('success');
        console.log(res);
        alert('保存しました');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <Layout auth={auth}>
        <MyPage>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              flexDirection: 'column',
              width: 310,
              backgroundColor: '#ffffff',
              p: '40px',
              mt: '16px',
              mb: '48px',
              pl: '72px',
              pr: '72px',
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
              }}
            >
              お客様情報の変更
            </Box>

            <FormControl
              sx={{
                minWidth: '100%',
              }}
            >
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  mt: '16px',
                  mb: '8px',
                }}
              >
                お名前
              </FormHelperText>
              <TextField
                sx={{
                  backgroundColor: 'white',
                  width: 288,
                  '& .MuiInputBase-root': {
                    height: 40,
                  },
                }}
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              sx={{
                minWidth: '100%',
              }}
            >
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  mt: '16px',
                  mb: '8px',
                }}
              >
                郵便番号
              </FormHelperText>
              <TextField
                sx={{
                  backgroundColor: 'white',
                  width: 288,
                  '& .MuiInputBase-root': {
                    height: 40,
                  },
                }}
                type='text'
                value={formData.postcode}
                name='postcode'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              sx={{
                minWidth: '100%',
                textAlign: 'center',
              }}
            >
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  mt: '16px',
                  mb: '8px',
                }}
              >
                都道府県
              </FormHelperText>
              <TextField
                sx={{
                  backgroundColor: 'white',
                  width: 288,
                  '& .MuiInputBase-root': {
                    height: 40,
                  },
                }}
                type='text'
                name='address1'
                value={formData.address1}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              sx={{
                minWidth: '100%',
              }}
            >
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  mt: '16px',
                  mb: '8px',
                }}
              >
                市町村番地・号
              </FormHelperText>
              <TextField
                sx={{
                  backgroundColor: 'white',
                  width: 288,
                  '& .MuiInputBase-root': {
                    height: 40,
                  },
                }}
                type='text'
                name='address2'
                value={formData.address2}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              sx={{
                minWidth: '100%',
              }}
            >
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  mt: '16px',
                  mb: '8px',
                }}
              >
                建物
              </FormHelperText>
              <TextField
                sx={{
                  backgroundColor: 'white',
                  width: 288,
                  '& .MuiInputBase-root': {
                    height: 40,
                  },
                }}
                type='text'
                name='address3'
                value={formData.address3}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              sx={{
                minWidth: '100%',
                mb: '16px',
              }}
            >
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  mt: '16px',
                  mb: '8px',
                }}
              >
                お電話番号
              </FormHelperText>
              <TextField
                sx={{
                  backgroundColor: 'white',
                  width: '288px',
                  '& .MuiInputBase-root': {
                    height: 40,
                  },
                }}
                type='tel'
                value={formData.telPhone}
                name='telPhone'
                onChange={handleChange}
              />
            </FormControl>
          </Box>
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
                '@media screen and (min-width:600px)': {
                  width: '168px',
                  height: '32px',
                },
              }}
              variant='contained'
              color='primary'
              onClick={Submit}
            >
              保存
            </Button>
          </Box>
        </MyPage>
      </Layout>
    </>
  );
}
