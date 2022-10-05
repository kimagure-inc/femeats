import React, { useEffect, useState } from "react";
import MyPage from "../../layout/mypage";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState();
  const [name, setName] = useState(data.name);
  const [tel, setTel] = useState(data.TelPhone);
  const [auth, setAuth] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setAuth(false);
        router.push("/login");
      });
  }, []);

  const Submit = async (e: any) => {
    e.preventDefault();
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return (
    <>
      <Layout auth={auth}>
        <MyPage>
          {console.log(data)}
          <div>
            <div>お客様の情報の変更</div>
            <form>
              <input
                type="text"
                value={data.neme}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <div>{data.name}</div>
              <button onClick={Submit}>更新</button>
            </form>
          </div>
        </MyPage>
      </Layout>
    </>
  );
}
