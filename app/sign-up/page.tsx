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
    const [nicknameErrorState, setNickNameErrorState] = useState<boolean | null>(null);
    const [idErrorState, setIdErrorState] = useState<boolean | null>(null);
    const [passwordErrorState, setPasswordErrorState] = useState<boolean | null>(null);
    const [passwordCheckErrorState, setPasswordCheckErrorState] = useState<boolean | null>(null);
    
    const [nicknameErrorMessage, setNickNameErrorMessage] = useState("");
    const [idErrorMessage, setIdErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState("");

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
        <main className="
            min-h-[calc(100dvh-80px)]
            flex items-center justify-center
            bg-[#343333]
            px-4 py-12">
            <form
                onSubmit={onSubmit}
                className="
                    w-full max-w-[480px]
                    rounded-2xl
                    bg-[#404040]
                    px-6 py-10
                    shadow-xl shadow-black/20
                    sm:px-10">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">
                        회원가입
                    </h1>
                    <p className="mt-2 text-sm text-neutral-400">
                        D.MS에 가입하고 좋아하는 작품을 기록해보세요.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-neutral-200">
                            닉네임
                        </label>
                        <Input
                            type="name"
                            value={nickname}
                            kind="signup"
                            onChange={setNickname}
                            validate={v => validation.name.regex.test(v)}
                            onValidate={isValid =>
                                setValids(prev => ({ ...prev, nickname: isValid }))
                            }
                            setErrorState={setNickNameErrorState}
                            setErrorMessage={setNickNameErrorMessage}
                            placeholder="닉네임을 입력하세요"/>
                        <p className={`
                            text-xs leading-relaxed
                            ${nicknameErrorState === null
                                ? "text-neutral-400"
                                : nicknameErrorState
                                    ? "text-sky-400"
                                    : "text-red-400"}
                        `}>
                            <span className="mr-1">※</span>
                            {nicknameErrorState === null
                                ? validation.name.guide
                                : nicknameErrorState
                                    ? "사용가능합니다."
                                    : nicknameErrorMessage}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-neutral-200">
                            아이디
                        </label>
                        <Input
                            type="id"
                            value={id}
                            kind="signup"
                            onChange={setId}
                            validate={v => validation.id.regex.test(v)}
                            onValidate={isValid =>
                                setValids(prev => ({ ...prev, id: isValid }))
                            }
                            setErrorState={setIdErrorState}
                            setErrorMessage={setIdErrorMessage}
                            placeholder="아이디를 입력하세요"
                        />
                        <p className={`
                            text-xs leading-relaxed
                            ${idErrorState === null
                                ? "text-neutral-400"
                                : idErrorState
                                    ? "text-sky-400"
                                    : "text-red-400"}
                        `}>
                            <span className="mr-1">※</span>
                            {idErrorState === null
                                ? validation.id.guide
                                : idErrorState
                                    ? "사용가능합니다."
                                    : idErrorMessage}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-neutral-200">
                            비밀번호
                        </label>
                        <Input
                            type="password"
                            value={password}
                            kind="signup"
                            onChange={setPassword}
                            validate={v => validation.password.regex.test(v)}
                            onValidate={isValid =>
                                setValids(prev => ({ ...prev, password: isValid }))
                            }
                            setErrorState={setPasswordErrorState}
                            setErrorMessage={setPasswordErrorMessage}
                            placeholder="비밀번호를 입력하세요"/>
                        <p className={`
                            text-xs leading-relaxed
                            ${passwordErrorState === null
                                ? "text-neutral-400"
                                : passwordErrorState
                                    ? "text-sky-400"
                                    : "text-red-400"}
                        `}>
                            <span className="mr-1">※</span>
                            {passwordErrorState === null
                                ? validation.password.guide
                                : passwordErrorState
                                    ? "사용가능합니다."
                                    : passwordErrorMessage}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-neutral-200">
                            비밀번호 확인
                        </label>
                        <Input
                            type="password"
                            value={passwordCheck}
                            kind="signup"
                            onChange={setPasswordCheck}
                            pwValue={{ password }}
                            onValidate={isValid =>
                                setValids(prev => ({
                                    ...prev,
                                    passwordCheck: isValid
                                }))
                            }
                            validate={(v, vc) =>
                                v === vc?.password && vc.password !== ""
                            }
                            setErrorState={setPasswordCheckErrorState}
                            setErrorMessage={setPasswordCheckErrorMessage}
                            placeholder="비밀번호를 다시 입력하세요"/>
                        {passwordCheckErrorState !== null && (
                            <p className={`
                                text-xs leading-relaxed
                                ${passwordCheckErrorState
                                    ? "text-sky-400"
                                    : "text-red-400"}
                            `}>
                                <span className="mr-1">※</span>
                                {passwordCheckErrorState
                                    ? "사용가능합니다."
                                    : passwordCheckErrorMessage}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-3 mt-9">
                    <Link
                        href="/login"
                        className="
                            flex-1 flex items-center justify-center
                            py-3 rounded-lg
                            bg-[#555555] text-white
                            font-semibold
                            transition-colors duration-200
                            hover:bg-[#4A4A4A]">
                        취소
                    </Link>

                    <button
                        type="submit"
                        className="
                            flex-1 py-3 rounded-lg
                            bg-sky-400 text-neutral-900
                            font-semibold
                            cursor-pointer
                            transition-colors duration-200
                            hover:bg-sky-300">
                        확인
                    </button>
                </div>
            </form>
        </main>
    );
};