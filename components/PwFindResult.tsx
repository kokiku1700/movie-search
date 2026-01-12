"use client"

import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import Input from "./Input";
import { useState } from "react";
import { validation } from "@/domains/validate";
import { useRouter } from "next/navigation";

type Props = {
    setStep: React.Dispatch<React.SetStateAction<"identify" | "results">>;
    findState: boolean | null;
    searchResult: string | null;
    searchKind: string | null;
};

export default function PwFindResult ( { setStep, findState, searchResult, searchKind }: Props) {
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const [valids, setValids] = useState({
        password: null as boolean | null,
        passwordCheck: null as boolean | null,
    });

    const router = useRouter();

    const onClickChange = () => {
        setStep("identify");
    };

    const onSubmit = async( e: React.FormEvent ) => {
        e.preventDefault();
        
        let userId: string | null;

        if ( searchKind === "nickname" ) {
            const res = await fetch('/api/check_user', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    value: searchResult
                })
            });
            const value = await res.json();
            
            userId = value.id;
        } else {
            userId = searchResult;
        }

        if ( Object.values(valids).every(v => v === true) ) {
            await fetch('/api/edit', {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: userId,
                    password: passwordCheck,
                })
            });

            localStorage.clear();
            alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
            router.replace('/login');
        } else {
            console.log('fsd')
        };
    };

    return (
        <div className="
            w-[90%] 
            mx-auto mt-10 p-10
            flex flex-col items-center
            rounded-xl
            bg-gradient-to-br from-neutral-200 to-neutral-400
            lg:w-[60%]
            xl:w-[40%] xl:mt-25 xl:p-20">
            <Logo loc="black"/>
            {findState 
                ?
                <form onSubmit={onSubmit}>
                    <Input
                        type="password" value={password} kind="signup"
                        onChange={setPassword}
                        validate={v => validation.password.regex.test(v)}
                        onValidate={isValid => setValids(prev => ({...prev, password: isValid}))}
                        placeholder="새 비밀번호"/>
                    <Input 
                        type="password" value={passwordCheck} kind="signup"
                        onChange={setPasswordCheck}
                        pwValue={{password}}
                        validate={(v, vc) => v === vc?.password && vc.password !== ""} 
                        onValidate={isValid => setValids(prev => ({...prev, passwordCheck: isValid}))}
                        placeholder="새 비밀번호 확인"/>
                    <div className="flex gap-2">
                        <Link 
                            href="/login"
                            className="
                                w-[60%]
                                p-3 my-3
                                text-center text-red-500
                                rounded-4xl
                                bg-white
                                lg:text-xl">
                            취소
                        </Link>
                        <Button content="확인" />
                    </div>
                </form>
                :
                <div 
                    className="
                        w-full
                        flex flex-col
                        ">
                    <p className="text-center text-black my-2">
                        존재하는 아이디 혹은 닉네임이 없습니다.
                    </p>
                    <div 
                        className="
                            w-full
                            flex gap-2
                            mx-auto
                            lg:w-[70%]">
                        <Link 
                            href="/"
                            className="
                                    w-[60%]
                                    p-3 my-3
                                    text-center text-black
                                    rounded-4xl
                                    bg-white
                                    lg:text-xl">홈</Link>
                        <Link 
                            href="pw_Find" 
                            onClick={onClickChange}
                            className="
                                    w-[60%]
                                    p-3 my-3
                                    text-center text-black whitespace-nowrap
                                    rounded-4xl
                                    bg-white
                                    lg:text-xl">다시 찾기</Link>
                    </div>  
                </div>
            }
        </div>
    )
}