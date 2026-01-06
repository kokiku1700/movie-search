"use client";

import ChangeModal from "@/components/ChangeModal";
import Logo from "@/components/Logo";
import ModalButton from "@/components/ModalButton";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

    useEffect(() => {
        const id = localStorage.getItem("id") ?? "";
        const nickname = localStorage.getItem("nickname") ?? "";

        setInformation({id, nickname});
    }, []);

    // 모달이 켜지면 뒤에 스크롤 막음.
    useEffect(() => {
        if ( modalState ) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [modalState]);

    const onSaveInfo = (e: Information) => {
        setInformation(e);
    };
    // 닉네임 혹은 비밀번호 변경 버튼 클릭 시 
    // 수정할 수 있는 모달창 열림
    // 이 함수는 모달이 열렸을 때 취소 버튼에서도 동작한다.
    // 때문에 매개변수가 필수가 아니게 작성했다. 
    const modalToggle = ( type?: string ) => {
        setModalType(type || "");
        setModalState(!modalState);
    };
    // 회원탈퇴 함수
    const onUnregister = async() => {
        const result = confirm("정말 탈퇴하시겠습니까?");

        if ( result ) {
            await fetch('/api/unregister', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: information.id
                })
            });
            localStorage.clear();
            router.replace('/');
        };
    };

    return (
        <div className="w-full">
            <section className="
                w-[90%] mx-auto mt-10 p-5
                rounded-lg
                bg-gradient-to-br from-gray-500 to-gray-400
                lg:w-[60%]
                xl:w-[40%] xl:mt-20 xl:p-10">
                <div className="text-center mt-5 mb-5 pb-5 border-b">
                    <Logo />
                </div>
                <div className="flex items-center">
                    <h3 className="text-xl m-5 xl:text-3xl">아이디 :</h3>
                    <span className="text-lg">{information.id}</span>
                </div>
                <div className="flex items-center">
                    <h3 className="text-xl m-5 xl:text-3xl">닉네임 :</h3>
                    <span className="text-lg">{information.nickname}</span>
                    <ModalButton content="변경" name="nickcname" onClick={() => modalToggle("nickname")} color="black" />
                </div>
                <div className="flex w-full items-center">
                    <h3 className="text-xl ml-5 my-5 xl:text-3xl">비밀번호 :</h3>
                    <ModalButton content="변경" name="password" onClick={() => modalToggle("password")} color="black" />
                </div>
                <button 
                    onClick={onUnregister}
                    className="
                    m-2 p-3
                    text-red-400
                    cursor-pointer
                    ">
                    회원탈퇴
                </button>
            </section>
            {modalState && <ChangeModal modalType={modalType} id={information.id} nickname={information.nickname} onSave={onSaveInfo} onClick={modalToggle} />}
        </div>
    )
}