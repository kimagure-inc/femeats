import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");
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
          router.push("/email/auth");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("パスワードが違います");
    }
  };

  return (
    <>
      <h1>ユーザー登録</h1>
      <p>購入手続きの前にユーザー登録が必要です</p>
      <form>
        <div>
          <label>メールアドレス</label>
          <input
            type="text"
            placeholder="mail@example.com"
            onInput={(e) => setEmail(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label>パスワード(再確認)</label>
          <input
            type="password"
            onInput={(e) => setPass(e.currentTarget.value)}
          />
        </div>
        <button type="submit" onClick={Submit}>
          送信
        </button>
      </form>
    </>
  );
}
