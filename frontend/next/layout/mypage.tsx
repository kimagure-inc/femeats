import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "./Layout";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { hasCookie, getCookies } from "cookies-next";

export default function MyPage({ children }: any) {
  const router = useRouter();
  useLayoutEffect(() => {
    const signedIn = hasCookie("signedIn");
    if (signedIn !== true) router.replace("/login");
  }, []);

  return (
    <div>
      <nav>
        <div>
          <a>マイページ</a>

          <div id="navbarCollapse">
            <ul>
              <li>
                <Link href="/mypage">
                  <a>TOP</a>
                </Link>
              </li>
              <li>
                <Link href="/mypage/profile">
                  <a>お客様情報の変更</a>
                </Link>
              </li>
              <li>
                {/* <Link href="/top"> */}
                <a>請求先情報の変更</a>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href="/"> */}
                <a>契約情報の変更</a>
                {/* </Link> */}
              </li>
              <li>
                <Link href="/questions">
                  <a>パーソナル診断</a>
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

// export const getServerSideProps = () => {
//   const signedIn = hasCookie("signedIn");
//   if (signedIn !== true)
//     return {
//       redirect: {
//         statusCode: 302, // ステータスコード指定
//         destination: "/login", // リダイレクト先
//       },
//     };
// };
