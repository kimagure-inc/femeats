import React from 'react';
import Image from 'next/image';

const Product = (props: any) => {

  return (
    <>
      <div>商品情報</div>
      <div>{props.productName}</div>
      <div>{props.price}円（税込）</div>
      <Image src={props.img} width={320} height={320} />
    </>
  );
};

export default Product;
