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
                <div className="w-full flex justify-center gap-4">
                    <Link href={"/likes"}>좋아요</Link>
                    <Link href={'/myInformation'}>{userNickname} 님</Link>
                    <span onClick={handleLogout} className="cursor-pointer">로그아웃</span>
                </div>
                :
                <div className="w-full flex justify-center">
                    <Link href={"/login"} className="mx-2 px-2 whitespace-nowrap">로그인</Link>
                    <Link href={"/signUp"} className="mx-2 px-2 whitespace-nowrap">회원가입</Link>
                </div>
            }
        </> 
    )
}