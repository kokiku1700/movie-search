"use client";

import ChangeModal from "@/components/ChangeModal";
import ModalButton from "@/components/ModalButton";
import { useEffect, useState } from "react";

type Information = {
    id: string | '';
    nickname: string | '';
    password?: string;
};

export default function MyInformation () {
    const [information, setInformation] = useState<Information>({
        id:"",
        nickname:"",
    });
    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState("");
    
    useEffect(() => {
        const id = localStorage.getItem("id") ?? "";
        const nickname = localStorage.getItem("nickname") ?? "";

        setInformation({id, nickname});
    }, []);

    const onSaveInfo = (e: Information) => {
        setInformation(e);
    };

    const modalToggle = ( type?: string ) => {
        setModalType(type || "");
        setModalState(!modalState);
    };

    return (
        <div className="w-full">
            <section className="
                w-[40%] mx-auto mt-20 p-10
                rounded-lg bg-gray-500">
                <div className="flex items-center">
                    <h3>아이디</h3>
                    <span>{information.id}</span>
                </div>
                <div className="flex">
                    <h3>닉네임</h3>
                    <span>{information.nickname}</span>
                    <ModalButton content="닉네임 변경" name="nickcname" onClick={() => modalToggle("nickname")} />
                </div>
                <div className="flex w-[30%]">
                    <ModalButton content="비밀번호 변경" name="password" onClick={() => modalToggle("password")} />
                </div>
                <div className="w-[30%]">
                    <ModalButton content="회원탈퇴" />
                </div>
            </section>
            {modalState && <ChangeModal modalType={modalType} id={information.id} nickname={information.nickname} onSave={onSaveInfo} onClick={modalToggle} />}
        </div>
    )
}