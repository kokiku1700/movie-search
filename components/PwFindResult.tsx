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
        <div className="w-[90%] mx-auto flex flex-col items-center">
            <Logo />
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
                    <div className="flex">
                        <Link 
                            href="/login"
                            className="
                                text-center text-red-500
                                rounded-4xl
                                bg-white">
                            취소
                        </Link>
                        <Button content="확인" />
                    </div>
                </form>
                :
                <div>
                    <p>
                        존재하는 아이디 혹은 닉네임이 없습니다.
                    </p>
                    <Link href="/">홈</Link>
                    <Link href="pw_Find" onClick={onClickChange}>비밀번호 찾기</Link>
                </div>
            }
        </div>
    )
}