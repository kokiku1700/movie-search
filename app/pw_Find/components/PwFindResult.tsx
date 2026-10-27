"use client"

import Link from "next/link";
import Button from "../../../components/Button";
import Logo from "../../../components/Logo";
import Input from "../../../components/Input";
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
        <main className="
            min-h-[calc(100dvh-80px)]
            flex items-center justify-center
            bg-[#343333]
            px-4 py-12">
            <section className="
                w-full max-w-[440px]
                rounded-2xl
                bg-[#404040]
                px-6 py-10
                shadow-xl shadow-black/20
                sm:px-10">
                    
                <div className="flex flex-col items-center">
                    <Logo />
                    <p className="
                        mt-4 text-center
                        text-sm text-neutral-300">
                        당신의 취향을 기록하는 영화 관리 서비스
                    </p>
                </div>

                {findState ? (
                    <>
                        <div className="mt-10 mb-7">
                            <h1 className="text-2xl font-bold text-white">
                                새 비밀번호 설정
                            </h1>
                            <p className="mt-2 text-sm text-neutral-400">
                                사용할 새 비밀번호를 입력해주세요.
                            </p>
                        </div>

                        <form
                            onSubmit={onSubmit}
                            className="flex flex-col gap-5">
                           
                            <div className="flex flex-col gap-2">
                                <label className="
                                    text-sm font-medium text-neutral-200">
                                    새 비밀번호
                                </label>
                                <Input
                                    type="password"
                                    value={password}
                                    kind="signup"
                                    onChange={setPassword}
                                    validate={v =>
                                        validation.password.regex.test(v)
                                    }
                                    onValidate={isValid =>
                                        setValids(prev => ({
                                            ...prev,
                                            password: isValid
                                        }))
                                    }
                                    placeholder="새 비밀번호 입력"/>
                                <p className="
                                    text-xs leading-relaxed
                                    text-neutral-400">
                                    <span className="mr-1">※</span>
                                    {validation.password.guide}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="
                                    text-sm font-medium text-neutral-200">
                                    새 비밀번호 확인
                                </label>
                                <Input
                                    type="password"
                                    value={passwordCheck}
                                    kind="signup"
                                    onChange={setPasswordCheck}
                                    pwValue={{ password }}
                                    validate={(v, vc) =>
                                        v === vc?.password &&
                                        vc.password !== ""
                                    }
                                    onValidate={isValid =>
                                        setValids(prev => ({
                                            ...prev,
                                            passwordCheck: isValid
                                        }))
                                    }
                                    placeholder="새 비밀번호 다시 입력"/>
                            </div>

                            <div className="flex gap-3 mt-4">
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
                    </>
                ) : (
                    <>
                        <div className="
                            flex flex-col items-center
                            mt-10 mb-8
                            text-center">
                            <div className="
                                flex items-center justify-center
                                w-14 h-14 mb-5
                                rounded-full
                                bg-red-400/10">
                                <span className="
                                    text-3xl font-bold text-red-400">
                                    !
                                </span>
                            </div>

                            <h1 className="text-xl font-bold text-white">
                                계정을 찾을 수 없습니다
                            </h1>

                            <p className="
                                mt-3 text-sm
                                text-neutral-400 leading-relaxed">
                                입력한 아이디 또는 닉네임과
                                <br />
                                일치하는 계정이 없습니다.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href="/"
                                className="
                                    flex-1 flex items-center justify-center
                                    py-3 rounded-lg
                                    bg-[#555555] text-white
                                    font-semibold
                                    transition-colors duration-200
                                    hover:bg-[#4A4A4A]">
                                홈
                            </Link>

                            <Link
                                href="/pw_Find"
                                onClick={onClickChange}
                                className="
                                    flex-1 flex items-center justify-center
                                    py-3 rounded-lg
                                    bg-sky-400 text-neutral-900
                                    font-semibold
                                    transition-colors duration-200
                                    hover:bg-sky-300">
                                다시 찾기
                            </Link>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
};