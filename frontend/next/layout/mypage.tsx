import React, { useEffect, useLayoutEffect, useState } from 'react';
import Layout from './Layout';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { hasCookie, getCookies } from 'cookies-next';

export default function MyPage({ children }: any) {
  const [data, setData] = useState();
  return (
    <div>
      <nav>
        <div>
          <a>マイページ</a>

          <div id='navbarCollapse'>
            <ul>
              <li>
                <Link href='/mypage'>
                  <div>TOP</div>
                </Link>
              </li>
              <li>
                <Link href='/mypage/profile'>
                  <div>お客様情報</div>
                </Link>
              </li>
              <li>
                {/* <Link href="/top"> */}
                <>請求先情報</>
                {/* </Link> */}
              </li>
              <li>
                <Link href='/mypage/info'>
                  <div>契約情報</div>
                </Link>
              </li>
              <li>
                <Link href='/questions'>
                  <div>パーソナル診断</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
