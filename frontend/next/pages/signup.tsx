import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../layout/Layout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from '@mui/system/styled';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';

interface Inputs {
  mail: string;
  password: string;
  pass: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#333333',
}));

const StyledOutlinedInput = styled(OutlinedInput, {
  name: 'StyledOutlinedInput',
})({
  backgroundColor: 'white',
  width: 288,
  height: 40,
});

export default function SignUp() {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const product_id = router.query.id;

  const Submit = async (e: any) => {
    e.preventDefault();
    if (password == pass) {
      const data = {
        email,
        password,
        product_id,
      };
      console.log(data);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signup`, data)
        .then((res) => {
          console.log(res);
          router.push('/email/auth');
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert('パスワードが違います');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPass = () => {
    setShowPass(!showPass);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Layout auth={false}>
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
          }}
        >
          <StyledBox
            sx={{
              fontSize: '24px',
              fontWeight: '700',
            }}
          >
            ユーザー登録
          </StyledBox>
          <StyledBox
            sx={{
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            購入手続きの前にユーザー登録が必要です
          </StyledBox>
          <FormControl sx={{ m: 1, minWidth: 288 }}>
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
            <StyledOutlinedInput
              type='text'
              {...register('mail', { required: true, maxLength: 30 })}
              placeholder='mail@example.com'
              autoComplete='off'
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 288 }}>
            <FormHelperText
              sx={{
                fontSize: '14px',
                fontWeight: '700',
                marginTop: '24px',
              }}
            >
              パスワード
            </FormHelperText>
            <FormHelperText
              sx={{
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              大文字含む8文字以上の半角英数記号
            </FormHelperText>
            <StyledOutlinedInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              autoComplete='off'
              onChange={(e) => setPassword(e.currentTarget.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 288 }}>
            <FormHelperText
              sx={{
                fontSize: '14px',
                fontWeight: '700',
                marginTop: '24px',
              }}
            >
              パスワード(再確認)
            </FormHelperText>
            <FormHelperText
              sx={{
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              大文字含む8文字以上の半角英数記号
            </FormHelperText>
            <StyledOutlinedInput
              type={showPass ? 'text' : 'password'}
              value={pass}
              autoComplete='off'
              onChange={(e) => setPass(e.currentTarget.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPass}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            sx={{
              borderRadius: 16,
              fontSize: '0.875rem',
              fontWeight: '700',
              backgroundColor: '#333333',
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
            type='submit'
            onClick={Submit}
          >
            送信
          </Button>
        </Box>
      </Layout>
    </>
  );
}
