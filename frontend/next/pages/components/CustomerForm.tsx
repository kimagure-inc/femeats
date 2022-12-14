import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';

interface Inputs {
  name: string;
  zipCode: number;
  prefecture: string;
  cityAndTown: string;
  otherAddresses: string;
  tel: number;
}

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

type Props = {
  address1: string;
  address2: string;
  address3: string;
  delTime: number;
  deliveryDate: string;
  postcode: string;
  price: number;
  product_id: string;
  stripe_sub_id: string;
  tel: string;
  userName: string;
  user_id: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setPostcode: React.Dispatch<React.SetStateAction<string>>;
  setAddress1: React.Dispatch<React.SetStateAction<string>>;
  setAddress2: React.Dispatch<React.SetStateAction<string>>;
  setAddress3: React.Dispatch<React.SetStateAction<string>>;
  setTel: React.Dispatch<React.SetStateAction<string>>;
  nameChange: Function;
  postcodeChange: Function;
  address1Change: Function;
  address2Change: Function;
  address3Change: Function;
  telChange: Function;
};

const CustomerForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const [zipCode, setZipCode] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [cityAndTown, setCityAndTown] = useState('');

  const handleChange = async (e: { target: { value: number; }; }) => {
    console.log(e.target.value);
    const res = await axios.get(
      'https://api.zipaddress.net/?zipcode=' + zipCode
    );
    console.log(res);
    if (res.data.code === 200) {
      setPrefecture(res.data.data.pref);
      setCityAndTown(res.data.data.city + res.data.data.town);
    }
  };

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
            ???????????????
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
              ?????????
            </FormHelperText>
            <StyledTextField
              id='outlined-basic'
              variant='outlined'
              type='text'
              {...register('name', { required: true, maxLength: 20 })}
              autoComplete='off'
              onChange={(e) => props.nameChange(e.target.value)}
            />
            <FormHelperText
              sx={{
                fontSize: '14px',
                fontWeight: '700',
              }}
            >
              ???????????????????????????
            </FormHelperText>
            <FormHelperText
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
              }}
            >
              ????????????
            </FormHelperText>
            <StyledTextField
              autoComplete='off'
              {...register('zipCode', { required: true })}
              // value={zipCode}
              onChange={(e) => {
                // setZipCode(e.target.value);
                props.postcodeChange(e.target.value);
              }}
            />
            <FormHelperText
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                marginTop: '8px',
                marginBottom: '8px',
              }}
            >
              ????????????
            </FormHelperText>
            <StyledTextField
              type='text'
              autoComplete='off'
              {...register('prefecture', { required: true })}
              defaultValue={prefecture}
              onChange={(e) => props.address1Change(e.target.value)}
            />
            <FormHelperText
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                marginTop: '8px',
                marginBottom: '8px',
              }}
            >
              ????????????????????????
            </FormHelperText>
            <StyledTextField
              type='text'
              autoComplete='off'
              {...register('cityAndTown', { required: true })}
              defaultValue={cityAndTown}
              onChange={(e) => props.address2Change(e.target.value)}
            />
            <FormHelperText
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                marginTop: '8px',
                marginBottom: '8px',
              }}
            >
              ??????????????????
            </FormHelperText>
            <StyledTextField
              type='text'
              autoComplete='off'
              {...register('otherAddresses')}
              onChange={(e) => props.address3Change(e.target.value)}
            />
            <FormHelperText
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                marginTop: '8px',
                marginBottom: '8px',
              }}
            >
              ???????????????
            </FormHelperText>
            <StyledTextField
              type='tel'
              autoComplete='off'
              {...register('tel', {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              onChange={(e) => props.telChange(e.target.value)}
            />
          </FormControl>
        </StyledBox>
      </Grid>
    </>
  );
};

export default CustomerForm;
