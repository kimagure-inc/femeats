import React, { useEffect, useState } from 'react';
import MyPage from '../../layout/mypage';
import Layout from '../../layout/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';

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

  const handleChange = (e: any) => {
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

  const Submit = async (e: any) => {
    e.preventDefault();
    console.log(formData, 'id', id);

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

  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'primary',
    backgroundColor: '#FFFFFF',
    width: '350px',
    marginBottom: '32px',
  }));

  const StyledTextField = styled(TextField, {
    name: 'StyledTextField',
  })({
    backgroundColor: 'white',
    width: 288,
    marginTop: 8,
    '& .MuiInputBase-root': {
      height: 40,
    },
    marginBottom: '24px',
  });
  return (
    <>
      <Layout auth={auth}>
        <MyPage>
          <>
            {console.log(data)}
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
                  お客様情報の変更
                </Box>
                <FormControl sx={{ m: 1, minWidth: 288 }}>
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

                  <div>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>メールアドレス</label>
                    <input
                      type='text'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>郵便番号</label>
                    <input
                      type='text'
                      value={formData.postcode}
                      name='postcode'
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <div>
                      <label>都道府県</label>
                      <input
                        type='text'
                        name='address1'
                        value={formData.address1}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>市町村番地・号</label>
                      <input
                        type='text'
                        name='address2'
                        value={formData.address2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>建物</label>
                      <input
                        type='text'
                        name='address3'
                        value={formData.address3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>お電話番号</label>
                      <input
                        type='tel'
                        value={formData.telPhone}
                        name='telPhone'
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button onClick={Submit}>保存</button>
                </FormControl>
              </StyledBox>
            </Grid>
          </>
        </MyPage>
      </Layout>
    </>
  );
}
