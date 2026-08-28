"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserMenu () {
    const [userNickname, setUserNickname] = useState("");

    useEffect(() => {
        const userNickname = localStorage.getItem("nickname");

        setUserNickname(userNickname || "");
    }, []);

    const handleLogout = () => {
        const answer = confirm("로그아웃 하시겠습니까?");

        if ( answer ) {
            localStorage.clear();
            setUserNickname("");
            window.location.href = "/";
        };
    };

    return (
        <>
            {userNickname ? 
                <div 
                    className="
                        z-99
                        absolute top-full right-0
                        flex flex-col items-center justify-center gap-2
                        p-2
                        rounded-xl
                        whitespace-nowrap
                        bg-black
                        lg:flex-row lg:bg-transparent lg:relative">
                    <Link 
                        href={"/likes"} 
                        className="
                            px-7 py-3 
                            whitespace-nowrap 
                            hover:text-sky-500
                            sm:px-10 sm:py-5
                            lg:px-3 lg:py-1">
                        좋아요
                    </Link>
                    <Link 
                        href={'/myInformation'} 
                        className="
                            px-7 py-3
                            whitespace-nowrap 
                            hover:text-sky-500
                            sm:px-10 sm:py-5
                            lg:px-3 lg:py-1">
                        {userNickname} 님
                    </Link>
                    <span 
                        onClick={handleLogout} 
                        className="
                            px-7 py-3
                            whitespace-nowrap 
                            cursor-pointer 
                            hover:text-sky-500
                            sm:px-10 sm:py-5
                            lg:px-3 lg:py-1">
                        로그아웃
                    </span>
                </div>
                :
                <div 
                    className="
                        z-99
                        absolute top-full right-0
                        flex flex-col items-center justify-center gap-2
                        p-2
                        rounded-xl
                        whitespace-nowrap
                        bg-black
                        lg:flex-row lg:bg-transparent lg:relative">
                    <Link href={"/login"} 
                        className="
                            px-7 sm:px-10 py-3 sm:py-5
                            whitespace-nowrap 
                            hover:text-sky-500
                            sm:px-10 sm:py-5
                            lg:px-3 lg:py-1">
                        로그인
                    </Link>
                    <Link href={"/signUp"} 
                        className="
                            px-7 sm:px-10 py-3 sm:py-5
                            whitespace-nowrap 
                            hover:text-sky-500
                            sm:px-10 sm:py-5
                            lg:px-3 lg:py-1">
                        회원가입
                    </Link>
                </div>
            }
        </> 
    )
}