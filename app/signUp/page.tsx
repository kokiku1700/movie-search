"use client";

import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import { validation } from "@/domains/validate";

export default function SignUp () {
    const [nickname, setNickname] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    // 로그인 최종 상태 모든 입력값을 올바르게 입력했을 경우 true
    const [valids, setValids] = useState({
        nickname: null as boolean | null,
        id: null as boolean | null,
        password: null as boolean | null,
        passwordCheck: null as boolean | null,
    });

    // 각 input별 에러 상태
    const [nicknameErrorState, setNickNameErrorState] = useState("");
    const [idErrorState, setIdErrorState] = useState("");
    const [passwordErrorState, setPasswordErrorState] = useState("");
    const [passwordCheckErrorState, setPasswordCheckErrorState] = useState("");

    const router = useRouter();

    async function onSubmit (e: FormEvent) {
        e.preventDefault();

        if ( Object.values(valids).every(v => v === true) ) {
            const res = await fetch("/api/signUp", {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_nickname: nickname,
                    user_id: id,
                    user_password: password,
                }),
            });
        
            const result = await res.json();

            if ( result.success ) {
                alert("회원가입이 성공적으로 완료됐습니다.");
                router.replace('/login');
            };
        };  
    };

    return (
        <form 
            onSubmit={onSubmit}
            className="
                w-[40%] bg-[#DCDCDC] 
                mx-auto pt-10 pb-20 mt-30 rounded-lg 
                flex flex-col items-center
                bg-gradient-to-br from-neutral-200 to-neutral-400
        ">
            <h1 className="text-2xl text-black m-5">회원가입</h1>
            <div className="w-full flex flex-col items-center ">
                <div className="w-[60%] flex flex-col">
                    <Input 
                        type="name" value={nickname} kind="signup"
                        onChange={setNickname} 
                        validate={v => validation.nickname.regex.test(v)} 
                        onValidate={isValid => setValids(prev => ({...prev, nickname: isValid}))}
                        setErrorState={setNickNameErrorState}
                        placeholder="닉네임"/>
                    <p className="text-black mx-5"><span className="mr-2">※</span>{validation.nickname.guide}</p>
                </div>
                <div className="w-[60%] flex flex-col">
                    <Input type="id" value={id} kind="signup" 
                        onChange={setId} 
                        validate={v => validation.id.regex.test(v)} 
                        onValidate={isValid => setValids(prev => ({...prev, id: isValid}))}
                        setErrorState={setIdErrorState}
                        placeholder="아이디"/>
                    <p className="text-black mx-5"><span className="mr-2">※</span>{validation.id.guide}</p>
                </div>
                <div className="w-[60%] flex flex-col">
                    <Input type="password" value={password} kind="signup" 
                        onChange={setPassword} 
                        validate={v => validation.password.regex.test(v)} 
                        onValidate={isValid => setValids(prev => ({...prev, password: isValid}))}
                        setErrorState={setPasswordErrorState}
                        placeholder="비밀번호"/>
                    <p className="text-black mx-5"><span className="mr-2">※</span>{validation.password.guide}</p>
                </div>
                <div className="w-[60%] flex flex-col">
                    <Input type="password" value={passwordCheck} kind="signup" 
                        onChange={setPasswordCheck} 
                        pwValue={{password}} 
                        onValidate={isValid => setValids(prev => ({...prev, passwordCheck: isValid}))}
                        validate={(v, vc) => v === vc?.password} 
                        setErrorState={setPasswordCheckErrorState}
                        placeholder="비밀번호 확인"/>
                </div>
            </div>
                 
            <div className="flex w-[60%] gap-[5%]">
                <Link href={'/'} 
                    className="
                        w-[60%]
                        text-xl text-black text-center
                        bg-[#FAFAFA] rounded-4xl
                        p-3 my-3 cursor-pointer
                        hover:shadow-sm hover:shadow-red-200
                        hover:text-red-500">
                    취소
                </Link>
                <Button content="확인" />
            </div>
        </form>
    )
}