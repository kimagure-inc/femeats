import React, { useEffect, useState } from 'react';
import MyPage from '../../../layout/mypage';
import axios from 'axios';
import Layout from '../../../layout/Layout';
import { useRouter } from 'next/router';
import Product from '../../components/Product';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShippmentForm from '../../components/ShippmentForm';
import ChangeoutForm from '../../components/ChangeoutForm';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { autocompleteClasses } from '@mui/material';

type userData = {};

export default function Info() {
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [selectPlan, setSelectPlan] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [delTime, setDelTime] = useState(1);
  const [page, setPage] = useState(false);
  const [selectCycle, setSelectCycle] = useState('');
  const [cs, setCs] = useState('');
  const [contract, setContract] = useState(false);
  let product;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        router.push('/login');
      });
  }, []);

  if (isLoading)
    return (
      <Layout>
        <MyPage>
          <p>Loading...</p>
        </MyPage>
      </Layout>
    );
  if (!data) return <p>No profile data</p>;

  const planChange = (event: SelectChangeEvent) => {
    setSelectPlan(event.target.value);
  };

  const select = (plan: string, cycle: string, data: any) => {
    for (let i = 0; i < data.product.length; i++) {
      if (
        cycle == data.product[i].deliveryCycle &&
        plan == data.product[i].name
      ) {
        product = data.product[i];
        return data.product[i].id;
      }
    }
  };

  const deliveryDateChange = (e: SelectChangeEvent) => {
    setDeliveryDate(e.target.value);
  };

  const delTimeChange = (e) => {
    setDelTime(e.target.value);
  };

  const cycleChange = (event: SelectChangeEvent) => {
    setSelectCycle(event.target.value);
  };

  const stripePromise = loadStripe(
    'pk_test_51Lj08EAdWjJU6gVu0jSZOsBWC8979STy2xBzS9poCK7L6mQ9LmqRgyusN9LULZyJuReMYzeeJHm5yrfnPVV1m9j400j1qUc3QL'
  );

  let orderDate = new Date(deliveryDate);
  orderDate.setDate(orderDate.getDate() - 4);

  let delDate = new Date(deliveryDate);
  delDate.setDate(delDate.getDate() + 1);

  const postData = {
    email: data.contract.user.email,
    product_id: select(selectPlan, selectCycle, data),
    userid: Number(data.contract.id),
    contractData: {
      product_id: select(selectPlan, selectCycle, data),
      timezone_id: Number(delTime),
      deliveryDate: delDate,
      status_id: 1,
      orderDate: orderDate,
    },
  };

  const Submit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/cs`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        setCs(res.data.subsuc.cs);
        setPage(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Layout auth={true}>
      <MyPage>
        {!page ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <Box
                sx={{
                  width: 350,
                  backgroundColor: '#ffffff',
                  p: '48px',
                  mt: '16px',
                  '@media screen and (min-width:600px)': {
                    width: '432px',
                  },
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 700,
                    mb: '16px',
                  }}
                >
                  変更後のプラン
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
                      marginBottom: '8px',
                    }}
                  >
                    契約プラン
                  </FormHelperText>
                  <Select name='datelist' onChange={planChange}>
                    {data.product.slice(0, 8).map((value: any) => (
                      <MenuItem key={value.name} value={value.name}>
                        {value.name}
                        {Number(value.price).toLocaleString()}円(税込)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: 350,
                  backgroundColor: '#ffffff',
                  p: '48px',
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
                  お届けサイクル
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
                      mb: '8px',
                      mt: '16px',
                    }}
                  >
                    配送サイクル
                  </FormHelperText>

                  <Select name='datelist' onChange={cycleChange}>
                    <MenuItem value={2}>2週間ごと</MenuItem>
                    <MenuItem value={3}>3週間ごと</MenuItem>
                    <MenuItem value={4}>4週間ごと</MenuItem>
                  </Select>
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
                    初回お届け日
                  </FormHelperText>
                  <Select name='datelist' onChange={deliveryDateChange}>
                    {dataSet.map((value: any) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  sx={{
                    minWidth: '100%',
                    mt: '16px',
                  }}
                >
                  <FormHelperText
                    sx={{
                      fontSize: '14px',
                      fontWeight: '700',
                      marginBottom: '8px',
                    }}
                  >
                    お届け時間帯
                  </FormHelperText>

                  <Select name='timezone' onChange={delTimeChange}>
                    {data.timezone.map((value: any) => (
                      <MenuItem value={value.id} key={value.id}>
                        {value.timezone}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                  mb: '16px',
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
                    color: 'primary',
                    width: '242px',
                    height: '48px',
                    '&:hover': {
                      background: '#FFF262',
                    },
                  }}
                  variant='contained'
                  onClick={Submit}
                >
                  支払いに進む
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <>
            {console.log(product)}
            <Box
              sx={{
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 700,
                mb: '16px',
                '@media screen and (min-width:600px)': {
                  width: '432px',
                },
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  m: '32px',
                  fontSize: '24px',
                  fontWeight: 700,
                }}
              >
                <div>支払い情報入力</div>
              </Box>
              <Product
                img={product.imgUrl}
                productName={product.name}
                price={product.price}
                deliveryCycle={product.deliveryCycle}
              />
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: cs,
                }}
              >
                <ChangeoutForm price={product.price} />
              </Elements>
            </Box>
          </>
        )}
      </MyPage>
    </Layout>
  );
}

// 5日後の日程から2週間表示させる（例：今日10/1 => 10/6~10/20の日程）
const days = ['日', '月', '火', '水', '木', '金', '土'];
const dataSet: any[] = [];
let start = Date.now() + 5 * 86400000; // 基準日=5日後の日程
let max = 14; // 何回繰り返すか
for (let i = 0; i < max; i++) {
  let newDay = new Date(start + i * 86400000);
  let year = newDay.getFullYear();
  let month = newDay.getMonth() + 1;
  let date = newDay.getDate();
  let day = days[newDay.getDay()];

  let selectDay = year + '/' + month + '/' + date + '(' + day + ')';

  dataSet.push(selectDay);
}
