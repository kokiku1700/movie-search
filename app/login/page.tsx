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
    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(false);

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
            setErrorMessage("");
            setErrorState(false);
        } else {
            setErrorMessage(result.message);
            setErrorState(true);
        }
    }

    return (
        <div className="
                w-[95%] bg-[#DCDCDC] 
                mx-auto px-5 pt-10 pb-20 mt-15 rounded-lg    
                flex flex-col items-center
                bg-gradient-to-br from-neutral-200 to-neutral-400
                lg:w-[60%] 
                xl:w-[40%]">
            <Logo loc="login" />
            <p className="
                my-2 
                text-sm text-neutral-700
                lg:text-base">
                당신의 취향을 기록하는 영화 관리 서비스
            </p>
            <form 
                onSubmit={onSubmit}
                className="
                    w-full
                    flex flex-col items-center
                    mt-2">
                <div className="w-[80%] lg:w-[60%]">
                    <Input type="id" value={id} onChange={setId} placeholder="아이디"/>
                    <Input type="password" value={password} onChange={setPassword} placeholder="비밀번호"/>
                </div>
                
                <p className={`${errorState ? "block" : "hidden"} text-red-600 mt-3`}>{errorMessage}</p>
                <div className="m-3">
                    <Link href={"signUp"} className="text-black hover:text-sky-500">회원가입</Link>
                    <span className="mx-2 cursor-default text-black">|</span>
                    <Link href={"pw_Find"} className="text-black hover:text-sky-500">비밀번호 찾기</Link>
                </div>
                <Button content="로그인" />
            </form>
        </div>
    )
}