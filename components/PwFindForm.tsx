"use client"

import Logo from "@/components/Logo";
import { FormEvent, useState } from "react";

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
        <div 
            onSubmit={onSubmit}
            className="
                flex flex-col items-center
                w-[95%] mx-auto mt-10 p-10
                rounded-xl
                bg-gradient-to-br from-neutral-200 to-neutral-400">
            <Logo loc="black" />
            <p className="mt-10 text-black">아이디 혹은 닉네임을 입력해주세요</p>
            <p className="mt-2 text-red-500">{errorMessage}</p>
            <form className="flex mt-2">
                <input 
                    type="text"
                    value={inputValue}
                    onChange={onChangeValue}
                    className="
                        w-[80%] 
                        pl-3 py-1
                        text-black
                        rounded-xl
                        bg-gray-200"/>
                <button className="
                    px-2
                    rounded-xl
                    text-black whitespace-nowrap
                    bg-gray-200
                ">
                    확인
                </button>
            </form> 
        </div>
    )
}