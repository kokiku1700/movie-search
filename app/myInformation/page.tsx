"use client";

import ChangeModal from "@/app/myInformation/components/ChangeModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    UserRound,
    LockKeyhole,
    ChevronRight,
} from "lucide-react";

type Information = {
    id: string;
    nickname: string;
    password?: string;
};

export default function MyInformation() {
    const [information, setInformation] = useState<Information>({
        id: "",
        nickname: "",
    });
    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState("");
    const router = useRouter();

    useEffect(() => {
        const id = localStorage.getItem("id") ?? "";
        const nickname = localStorage.getItem("nickname") ?? "";

        setInformation({ id, nickname });
    }, []);

    useEffect(() => {
        if (!modalState) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [modalState]);

    const onSaveInfo = (e: Information) => {
        setInformation(e);
    };

    const modalToggle = (type?: string) => {
        setModalType(type || "");
        setModalState(prev => !prev);
    };

    const onUnregister = async () => {
        const result = confirm("정말 탈퇴하시겠습니까?");
        if (!result) return;

        try {
            const res = await fetch("/api/unregister", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: information.id,
                }),
            });

            if (!res.ok) {
                throw new Error("회원탈퇴 실패");
            };

            localStorage.clear();
            router.replace("/");
        } catch (error) {
            console.error(error);
            alert("회원탈퇴 중 오류가 발생했습니다.");
        };
    };

    return (
        <main className="min-h-screen text-white">
            <div className="w-[90%] max-w-[800px] mx-auto py-12 md:py-20">

                <header className="mb-10">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        내 정보
                    </h1>
                    <p className="mt-3 text-sm text-gray-400">
                        계정 정보와 보안 설정을 관리할 수 있습니다.
                    </p>
                </header>

                <section className="rounded-xl bg-[#404040] p-6 md:p-8">

                    <div className="flex items-center gap-5 pb-6 border-b border-[#606060]">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#606060]">
                            <UserRound
                                size={30}
                                className="text-gray-300"/>
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-xl font-semibold">
                                {information.nickname || "사용자"}
                            </h2>
                            <p className="mt-1 truncate text-sm text-gray-400">
                                {information.id}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-6 border-b border-[#606060]">
                        <div>
                            <p className="mb-2 text-sm text-gray-400">
                                아이디
                            </p>
                            <p className="font-medium break-all">
                                {information.id}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-6">
                        <div className="min-w-0">
                            <p className="mb-2 text-sm text-gray-400">
                                닉네임
                            </p>
                            <p className="truncate font-medium">
                                {information.nickname}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => modalToggle("nickname")}
                            className="
                                shrink-0 rounded-lg
                                border border-[#606060]
                                px-4 py-2
                                text-sm font-medium
                                transition-colors
                                hover:bg-[#606060]
                                cursor-pointer">
                            변경
                        </button>
                    </div>
                </section>

                <section className="mt-10">
                    <h2 className="mb-4 text-xl font-semibold">
                        보안 설정
                    </h2>

                    <button
                        type="button"
                        onClick={() => modalToggle("password")}
                        className="
                            flex w-full items-center justify-between
                            rounded-xl bg-[#404040]
                            p-6 text-left
                            transition-colors
                            hover:bg-[#4A4A4A]
                            cursor-pointer">
                        <div className="flex items-center gap-4">
                            <LockKeyhole
                                size={22}
                                className="text-gray-400"/>
                            <div>
                                <h3 className="font-medium">
                                    비밀번호 변경
                                </h3>
                                <p className="mt-1 text-sm text-gray-400">
                                    계정의 비밀번호를 변경합니다.
                                </p>
                            </div>
                        </div>

                        <ChevronRight
                            size={20}
                            className="shrink-0 text-gray-400"/>
                    </button>
                </section>

                <section className="mt-10">
                    <h2 className="mb-4 text-xl font-semibold">
                        계정 관리
                    </h2>

                    <button
                        type="button"
                        onClick={onUnregister}
                        className="
                            flex w-full items-center justify-between
                            rounded-xl bg-[#404040]
                            p-6 text-left
                            transition-colors
                            hover:bg-[#4A4A4A]
                            cursor-pointer">
                        <div>
                            <h3 className="font-medium text-red-400">
                                회원탈퇴
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                계정을 영구적으로 삭제합니다.
                            </p>
                        </div>

                        <ChevronRight
                            size={20}
                            className="shrink-0 text-red-400"
                        />
                    </button>
                </section>
            </div>

            {modalState && (
                <ChangeModal
                    modalType={modalType}
                    id={information.id}
                    nickname={information.nickname}
                    onSave={onSaveInfo}
                    onClick={modalToggle}/>
            )}
        </main>
    );
};