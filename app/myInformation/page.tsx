"use client";

import Button from "@/components/Button";
import ChangeModal from "@/components/ChangeModal";
import { useEffect, useState } from "react";

type Information = {
    id: string | '';
    nickname: string | '';
};

export default function MyInformation () {
    const [information, setInformation] = useState<Information>({
        id:"",
        nickname:"",
    });

    useEffect(() => {
        const id = localStorage.getItem("id") ?? "";
        const nickname = localStorage.getItem("nickname") ?? "";

        setInformation({id, nickname});
    }, []);

    return (
        <div className="w-full">
            <section className="
                w-[60%] mx-auto mt-20 p-10
                rounded-lg bg-gray-500">
                <div className="flex items-center">
                    <h3>아이디</h3>
                    <span>{information.id}</span>
                </div>
                <div className="flex">
                    <h3>닉네임</h3>
                    <span>{information.nickname}</span>
                </div>
                <div className="flex w-[30%]">
                    <Button content="비밀번호 변경" />
                </div>
                <div className="w-[30%]">
                    <Button content="회원탈퇴" />
                </div>
            </section>
            <ChangeModal id={information.id} nickname={information.nickname} />
        </div>

    )
}