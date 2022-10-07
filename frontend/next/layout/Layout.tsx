import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

export default function Layout({ children, auth }: any) {
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
      <ul>
        <li>
          <Link href='/login'>
            <div>login</div>
          </Link>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul>
        <li>
          <div onClick={logout}>logout</div>
        </li>
      </ul>
    );
  }
  return (
    <>
      <Head>
        <title>feameats</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <nav>
        <div>
          <Link href='/questions'>
            <a>feameats</a>
          </Link>
          <div>{menu}</div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
