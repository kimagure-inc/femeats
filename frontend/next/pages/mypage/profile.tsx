import React, { useEffect, useState } from 'react';
import MyPage from '../../layout/mypage';
import Layout from '../../layout/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';

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

  // const [formData, setFormData] = useState<FormData>({
  //   name: '',
  //   email: '',
  //   address1: '',
  //   address2: '',
  //   address3: '',
  //   postcode: '',
  //   telPhone: '',
  // });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [tel, setTel] = useState('');

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

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

  const formData = {
    name,
    email,
    address1,
    address2,
    address3,
    postcode,
    tel,
  };

  const Submit = async (e: any) => {
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

  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: 'primary',
    backgroundColor: '#FFFFFF',
    width: '350px',
    marginBottom: '32px',
  }));

  const StyledText = styled(TextField, {
    name: 'StyledText',
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
                <StyledText
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <StyledText
                  type='text'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <StyledText
                  value={postcode}
                  name='postcode'
                  // onChange={handleChange}
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
                <StyledText
                  type='text'
                  name='address1'
                  value={address1}
                  // onChange={handleChange}
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
                <StyledText
                  type='text'
                  name='address2'
                  value={address2}
                  // onChange={handleChange}
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
                <StyledText
                  type='text'
                  name='address3'
                  value={address3}
                  // onChange={handleChange}
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
                <StyledText
                  type='tel'
                  value={tel}
                  name='telPhone'
                  // onChange={handleChange}
                />
                {/* 
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
                </div> */}
                <button onClick={Submit}>保存</button>
              </FormControl>
            </StyledBox>
          </Grid>
        </MyPage>
      </Layout>
    </>
  );
}
