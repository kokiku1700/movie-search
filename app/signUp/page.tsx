"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link";
import { useState } from "react"

export default function SignUp () {
    const [nickName, setNickName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");

    return (
        <section 
            className="
                w-[35%] bg-[#DCDCDC] 
                mx-auto pt-10 pb-20 mt-50 rounded-lg 
                flex flex-col items-center
        ">
            <h1 className="text-2xl text-black m-5">회원가입</h1>
            <Input value={nickName} onChange={setNickName} placeholder="닉네임을 입력해주세요"/>
            <Input value={id} onChange={setId} placeholder="아이디를 입력해주세요"/>
            <Input value={pw} onChange={setPw} placeholder="비밀번호를 입력해주세요"/>
            <Input value={pwCheck} onChange={setPwCheck} placeholder="비밀번호를 확인해주세요"/>
            <div className="flex w-[60%] gap-[5%]">
                <Link href={'/'} 
                    className="
                        w-[60%]
                        text-xl text-red-500 text-center
                        bg-[#FAFAFA]
                        rounded-4xl
                        p-3 my-3
                        cursor-pointer
                ">취소</Link>
                <Button content="확인" />
            </div>
        </section>
    )
}