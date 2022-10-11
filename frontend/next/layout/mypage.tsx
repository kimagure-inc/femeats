import React, { useEffect, useLayoutEffect, useState } from 'react';
import Layout from './Layout';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { hasCookie, getCookies, deleteCookie } from 'cookies-next';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

export default function MyPage({ children }: any) {
  const [data, setData] = useState();
  const router = useRouter();
  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/logout`, {
      withCredentials: true,
    });
    console.log('logout');
    deleteCookie('signedIn');
    await router.push('/login');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <List
          // sx={{
          //   display: { xs: 'none', sm: 'block' },
          // }}
          >
            <a>マイページ</a>
            <ListItem>
              <Link href='/mypage'>
                <div>TOP</div>
              </Link>
            </ListItem>
            <ListItem>
              <Link href='/mypage/profile'>
                <div>お客様情報</div>
              </Link>
            </ListItem>
            <ListItem>
              {/* <Link href="/top"> */}
              <>請求先情報</>
              {/* </Link> */}
            </ListItem>
            <ListItem>
              <Link href='/mypage/info'>
                <div>契約情報</div>
              </Link>
            </ListItem>
            <ListItem>
              <Link href='/questions'>
                <div>パーソナライズ診断</div>
              </Link>
            </ListItem>
            <ListItem onClick={logout}>ログアウト</ListItem>
          </List>
        </Box>
        <Box>
          <main>{children}</main>
        </Box>
      </Box>
    </>
  );
}
