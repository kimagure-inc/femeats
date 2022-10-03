import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import axios, { AxiosResponse, AxiosError } from "axios";
import React, { useState,useEffect, ChangeEvent } from 'react'

export default function signup() {

    const router = useRouter();
    console.log(router.query);

    return (
      <>
        <div>
            診断結果から選択した商品ID: { router.query ? router.query.id : "" }
        </div>
      </>
    );
}
