"use client"

import Logo from "@/components/Logo";
import { FormEvent, useState } from "react";
import Link from "next/link";

type Props = {
    setStep: React.Dispatch<React.SetStateAction<"identify" | "results">>;
    setFindState: React.Dispatch<React.SetStateAction<boolean | null>>;
    setSearchResult: React.Dispatch<React.SetStateAction<string | null>>;
    setSearchKind: React.Dispatch<React.SetStateAction<"id" | "nickname" | null>>;
};

export default function PwFindForm ({ setStep, setFindState, setSearchResult, setSearchKind }: Props) {
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onChangeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onSubmit = async( e:FormEvent ) => {
        e.preventDefault();

        if ( inputValue !== "" ) {
            const idRes = await fetch(`/api/check_id?id=${inputValue}`);
            const nicknameRes = await fetch(`/api/check_nickname?nickname=${inputValue}`);
            const idData = await idRes.json();
            const nicknameData = await nicknameRes.json();

            setStep("results");

            if ( idData.success ) {
                setSearchKind("id");
                setSearchResult(inputValue);
                setFindState(true);
            } else if ( nicknameData.success ) {
                setSearchKind("nickname");
                setSearchResult(inputValue);
                setFindState(true);
            } else {
                setFindState(false);
            }
        } else {
            setErrorMessage("공백은 입력할 수 없습니다.");
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
                </div>

                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-5 mt-5">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="account"
                            className="text-sm font-medium text-neutral-200">
                            아이디 또는 닉네임
                        </label>

                        <input
                            id="account"
                            type="text"
                            value={inputValue}
                            onChange={onChangeValue}
                            placeholder="아이디 또는 닉네임 입력"
                            autoComplete="username"
                            className="
                                w-full px-4 py-3
                                rounded-lg
                                bg-[#343333]
                                border border-neutral-600
                                text-white
                                placeholder:text-neutral-500
                                outline-none
                                transition-colors duration-200
                                focus:border-sky-400"/>
                    </div>

                    {errorMessage && (
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
                        확인
                    </button>
                </form>

                <div className="mt-7 text-center">
                    <Link
                        href="/login"
                        className="
                            text-sm text-neutral-300
                            transition-colors
                            hover:text-sky-400">
                        로그인으로 돌아가기
                    </Link>
                </div>
            </section>
        </main>
    );
};