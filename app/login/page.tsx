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
    };

    return (
        <main className="
            min-h-[100dvh]
            flex items-center justify-center
            bg-[#343333]
            px-4 py-12">

            <section className="
                w-full max-w-[500px]
                rounded-2xl
                bg-[#404040]
                px-6 py-10
                shadow-xl shadow-black/20
                sm:px-10">
                
                <div className="flex flex-col items-center">
                    <Logo />
                    <p className="
                        mt-4 text-center
                        text-sm text-neutral-300
                    ">
                        당신의 취향을 기록하는 영화 관리 서비스
                    </p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-5">
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-neutral-200">
                            아이디
                        </label>
                        <Input
                            type="id"
                            value={id}
                            onChange={setId}
                            placeholder="아이디를 입력하세요"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-neutral-200">
                            비밀번호
                        </label>
                        <Input
                            type="password"
                            value={password}
                            onChange={setPassword}
                            placeholder="비밀번호를 입력하세요"/>
                    </div>

                    {errorState && (
                        <p
                            role="alert"
                            className="text-sm text-red-400">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="
                            w-full py-3 mt-2
                            rounded-lg
                            bg-sky-400 text-neutral-900
                            font-semibold
                            cursor-pointer
                            transition-colors duration-200
                            hover:bg-sky-300">
                        로그인
                    </button>
                </form>

                <div className="
                    flex items-center justify-center
                    gap-4 mt-7
                    text-sm text-neutral-300">
                    <Link
                        href="/sign-up"
                        className="
                            transition-colors
                            hover:text-sky-400">
                        회원가입
                    </Link>

                    <span className="text-neutral-500">|</span>

                    <Link
                        href="/pw_Find"
                        className="
                            transition-colors
                            hover:text-sky-400">
                        비밀번호 찾기
                    </Link>
                </div>
            </section>
        </main>
    );
};