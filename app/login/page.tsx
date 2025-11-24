"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link"
import { useState } from "react"

export default function Login () {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    return (
        <section 
            className="
                w-[35%] bg-[#DCDCDC] 
                mx-auto pt-10 pb-20 mt-50 rounded-lg 
                flex flex-col items-center
        ">
            <h1 className="text-2xl text-black m-5">로그인</h1>
            <Input value={id} onChange={setId} placeholder="아이디"/>
            <Input value={pw} onChange={setPw} placeholder="비밀번호"/>
            <div className="m-3">
                <Link href={"signUp"} className="text-black">회원가입</Link>
                <span className="mx-2 cursor-default text-black">|</span>
                <Link href={"id_pw_Find"} className="text-black">아이디 찾기</Link>
                <span className="mx-2 cursor-default text-black">|</span>
                <Link href={"id_pw_Find"} className="text-black">비밀번호 찾기</Link>
            </div>
            <Button content="로그인" />
        </section>
    )
}