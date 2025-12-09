"use client";

import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

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

    const onClick = () => {
        console.log(valids);
    }

    return (
        <form 
            onSubmit={onSubmit}
            className="
                w-[35%] bg-[#DCDCDC] 
                mx-auto pt-10 pb-20 mt-50 rounded-lg 
                flex flex-col items-center
        ">
            <h1 onClick={onClick} className="text-2xl text-black m-5">회원가입</h1>
            <Input 
                type="name" value={nickname} kind="signup"
                onChange={setNickname} 
                validate={v => /^[가-힣]{2,12}$/.test(v)} 
                onValidate={isValid => setValids(prev => ({...prev, nickname: isValid}))}
                placeholder="닉네임을 입력해주세요"/>
            <Input type="id" value={id} kind="signup" 
                onChange={setId} 
                validate={v => /^[a-z0-9]{6,16}$/.test(v)} 
                onValidate={isValid => setValids(prev => ({...prev, id: isValid}))}
                placeholder="아이디를 입력해주세요"/>
            <Input type="password" value={password} kind="signup" 
                onChange={setPassword} 
                validate={v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(v)} 
                onValidate={isValid => setValids(prev => ({...prev, password: isValid}))}
                placeholder="비밀번호를 입력해주세요"/>
            <Input type="password" value={passwordCheck} kind="signup" 
                onChange={setPasswordCheck} 
                pwValue={{password}} 
                onValidate={isValid => setValids(prev => ({...prev, passwordCheck: isValid}))}
                validate={(v, vc) => v === vc?.password} 
                placeholder="비밀번호를 확인해주세요"/>
            <div className="flex w-[60%] gap-[5%]">
                <Link href={'/'} 
                    className="
                        w-[60%]
                        text-xl text-red-500 text-center
                        bg-[#FAFAFA]
                        rounded-4xl
                        p-3 my-3
                        cursor-pointer
                ">취소</Link>
                <Button content="확인" />
            </div>
        </form>
    )
}