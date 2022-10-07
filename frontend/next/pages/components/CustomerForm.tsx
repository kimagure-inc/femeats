import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface Inputs {
  name: string;
  zipCode: number;
  prefecture: string;
  cityAndTown: string;
  otherAddresses: string;
  tel: number;
}

const CustomerForm = (props: any) => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const [zipCode, setZipCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [cityAndTown, setCityAndTown] = useState("");

  const handleChange = async (e: any) => {
    console.log(e.target.value);
    const res = await axios.get(
      "https://api.zipaddress.net/?zipcode=" + zipCode
    );
    console.log(res);
    if (res.data.code === 200) {
      setPrefecture(res.data.data.pref);
      setCityAndTown(res.data.data.city + res.data.data.town);
    }
  };

  return (
    <>
      <div>{errors.zipCode && "郵便番号を入力してください"}</div>
      <div>{errors.prefecture && "都道府県を入力してください"}</div>
      <div>{errors.cityAndTown && "市区町村番地・号を入力してください"}</div>
      <div>{errors.tel && "電話番号を入力してください"}</div>
      <div>
        <label>お名前</label>
        <input
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
          placeholder="例：山崎 みずえ"
          onChange={(e) => props.nameChange(e.target.value)}
        />
      </div>
      <div>
        <label>郵便番号</label>
        <input
          {...register("zipCode", { required: true })}
          // value={zipCode}
          onChange={(e) => {
            // setZipCode(e.target.value);
            props.postcodeChange(e.target.value);
          }}
        />
        {/* <button onClick={handleChange}>住所検索</button> */}
      </div>
      <div>
        <div>
          <label>都道府県</label>
          <input
            type="text"
            {...register("prefecture", { required: true })}
            defaultValue={prefecture}
            onChange={(e) => props.address1Change(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <label>市区町村番地・号</label>
          <input
            type="text"
            {...register("cityAndTown", { required: true })}
            defaultValue={cityAndTown}
            onChange={(e) => props.address2Change(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <label>建物名・号室</label>
          <input
            type="text"
            {...register("otherAddresses")}
            onChange={(e) => props.address3Change(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <label>お電話番号</label>
          <input
            type="tel"
            {...register("tel", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
            onChange={(e) => props.telChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
