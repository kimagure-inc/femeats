import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MyPage from './mypage';
import axios from 'axios';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Layout({ children, auth }: any, props: Props) {
  const router = useRouter();
  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/logout`, {
      withCredentials: true,
    });
    console.log('logout');
    deleteCookie('signedIn');
    await router.push('/login');
  };
  let menu;

  if (!auth) {
    menu = (
      <Link href='/login'>
        <div>login</div>
      </Link>
    );
    // } else {
    //   menu = <div onClick={logout}>logout</div>;
  }

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerState(open);
    };

  return (
    <>
      <Head>
        <title>femeats</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://use.typekit.net/pyu1rly.css'
        ></link>
      </Head>
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar color='default' sx={{ flexGrow: 1 }}>
            <Toolbar>
              {auth ? (
                <>
                  <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                    onClick={toggleDrawer(true)}
                  >
                    <DragHandleIcon fontSize='large' />
                  </IconButton>
                  <Drawer open={drawerState} onClose={toggleDrawer(false)}>
                    <IconButton
                      size='large'
                      edge='end'
                      color='inherit'
                      sx={{
                        justifyContent: 'right',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginRight: '8px',
                      }}
                      onClick={toggleDrawer(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                    <MyPage />
                  </Drawer>
                </>
              ) : (
                <></>
              )}
              <Typography
                variant='h6'
                component='div'
                sx={{
                  flexGrow: 1,
                  fontFamily: 'adobe-garamond-pro',
                  justifyContent: 'center',
                  // align: 'center',
                  // textAlign: 'center',
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#182222',
                }}
              >
                <Link href='/'>
                  <Box>femeats</Box>
                </Link>
              </Typography>
              <Button
                color='inherit'
                sx={{
                  fontFamily: 'adobe-garamond-pro',
                  justifyContent: 'right',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#182222',
                }}
              >
                {menu}
              </Button>
            </Toolbar>
            <Divider />
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
          <Box sx={{ my: 2 }}>{children}</Box>
        </Container>
      </React.Fragment>
    </>
  );
}
