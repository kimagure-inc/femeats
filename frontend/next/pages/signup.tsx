import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import Modal from "./components/modal";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function auth() {
    const data = {
      email,
      password,
    };
    axios
      .post(`http://localhost:3000/user/signup`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <form>
        <div>
          <label>メールアドレス</label>
          <input
            type="text"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label>パスワード確認</label>
          <input type="password" />
        </div>
        <button type="submit" onClick={auth}>
          認証メールを送信する
        </button>
      </form>
    </>
  );
}
