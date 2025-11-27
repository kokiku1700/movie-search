"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import Logo from "@/components/Logo"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login () {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, password: password})
        });

        const result = await res.json();

        if ( result.success ) {
            router.replace("/");
            localStorage.setItem("nickname", result.user.nickname);
            localStorage.setItem("id", result.user.id);
        }
    }

    return (
        <div className="
                w-[35%] bg-[#DCDCDC] 
                mx-auto pt-10 pb-20 mt-50 rounded-lg    
                flex flex-col items-center">
            <Logo loc="login" />
            <form 
                onSubmit={onSubmit}
                className="
                    w-full
                    flex flex-col items-center
                    mt-4">
                <Input type="id" value={id} onChange={setId} placeholder="아이디"/>
                <Input type="password" value={password} onChange={setPassword} placeholder="비밀번호"/>
                <div className="m-3">
                    <Link href={"signUp"} className="text-black">회원가입</Link>
                    <span className="mx-2 cursor-default text-black">|</span>
                    <Link href={"id_pw_Find"} className="text-black">아이디 찾기</Link>
                    <span className="mx-2 cursor-default text-black">|</span>
                    <Link href={"id_pw_Find"} className="text-black">비밀번호 찾기</Link>
                </div>
                <Button content="로그인" />
            </form>
        </div>
    )
}