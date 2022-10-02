import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import axios, { AxiosResponse, AxiosError } from "axios";
import React, { useState,useEffect, ChangeEvent } from 'react'

type category = {
  id: number;
  name: string;
}

type product = {
  id: number;
  name: string;
  introduction: string;
  price: number;
  imgUrl: string;
}

export default function recommend() {

    const router = useRouter();
    const [category, setCategory] = useState<category>();
    const [products, setProducts] = useState<product[]>();

    const categoryNum = Number(router.query.category) - 1;

    const comment = [
      "バランスの取れた食事が必要です！", "タンパク質やビタミンを取りましょう！", "カルシウムを取りましょう！", "鉄やビタミンCを取りましょう！"
    ];

    useEffect(() => {
      if (!router.isReady) return;
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${router.query.category}`)
      .then((res: AxiosResponse) => {
        setCategory(res.data)
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e))

      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/${router.query.category}`)
      .then((res: AxiosResponse) => {
        setProducts(res.data)
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e))
    }, [router.isReady, router.query.category])

    console.log(category);
    console.log(products);

    return (
      <>
        <div>
          { router.query.name }さんの診断結果
          <br/>
          { comment[categoryNum] }
          <br/><br/>
          { category ? (
            <h2>おすすめプラン  {category.name} plan</h2>) : "" }
          <br/>
          { products ? (
          <>
          <div>
            <Image src ={products[0].imgUrl} width={320} height={320} />
          </div>          
          <br/>
          </>
          ) : (
            <div></div>
          )}
          { products ?  products[0].introduction : "" }
          <br/>
          { products ? (
            <>
              <label>{products[0].name}{" "}{products[0].price}円（税込）</label>
              <Link href={{ pathname: "/signUpTest", query: {id: products[0].id} }} as="signUpTest">
                <button>購入手続きへ</button>
              </Link>{" "}
              <br/>
              <label>{products[1].name}{" "}{products[1].price}円（税込）</label>
              <Link href={{ pathname: "/signUpTest", query: {id: products[1].id} }} as="signUpTest">
              <button>購入手続きへ</button>
              </Link> 
            </>
          ) : ( 
            <div></div>
          )}
          <br/><br/>
          <Link href="/questions">
              <button>もう1度診断する</button>
          </Link>
        </div>
      </>
    );
}