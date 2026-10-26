"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

type Information = {
    modalType: string;
    id: string;
    nickname: string;
    onClick: () => void;
    onSave: (info: {
        id: string;
        nickname: string;
        password?: string;
    }) => void;
};

export default function ChangeModal({
    modalType,
    id,
    nickname,
    onClick,
    onSave,
}: Information) {
    const [local, setLocal] = useState({ id, nickname });

    const [password, setPassword] = useState({
        now: "",
        edit: "",
        editCheck: "",
    });

    const [duplication, setDuplication] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setLocal({ id, nickname });
    }, [id, nickname]);

    const onChangeLocal = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLocal(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setDuplication(false);
        setErrorMessage("");
        setSuccessMessage("");
    };

    const onChangePW = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setErrorMessage("");
    };

    // 닉네임 중복확인
    const onClickDuplication = async () => {
        const newNickname = local.nickname.trim();

        if (!newNickname) {
            setErrorMessage("닉네임을 입력해주세요.");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        setDuplication(false);

        try {
            const res = await fetch(
                `/api/check_nickname?nickname=${encodeURIComponent(newNickname)}`
            );

            if (!res.ok) throw new Error();

            const data = await res.json();

            if (data.success) {
                setErrorMessage("이미 사용 중인 닉네임입니다.");
            } else {
                setDuplication(true);
                setSuccessMessage("사용 가능한 닉네임입니다.");
            }
        } catch {
            setErrorMessage("중복확인 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 정보 변경
    const onClickEdit = async () => {
        setErrorMessage("");

        if (modalType === "nickname") {
            if (!duplication) {
                setErrorMessage("닉네임 중복확인을 해주세요.");
                return;
            }
        } else {
            if (!password.now) {
                setErrorMessage("현재 비밀번호를 입력해주세요.");
                return;
            }

            if (!password.edit) {
                setErrorMessage("새 비밀번호를 입력해주세요.");
                return;
            }

            if (!password.editCheck) {
                setErrorMessage("비밀번호 확인을 입력해주세요.");
                return;
            }

            if (password.edit !== password.editCheck) {
                setErrorMessage("새 비밀번호가 일치하지 않습니다.");
                return;
            }
        }

        setIsLoading(true);

        try {
            if (modalType === "password") {
                const res = await fetch("/api/check_pw", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                });

                if (!res.ok) throw new Error();

                const data = await res.json();

                if (data.user_password !== password.now) {
                    setErrorMessage("현재 비밀번호가 다릅니다.");
                    return;
                }
            }

            const res = await fetch("/api/edit", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    modalType === "nickname"
                        ? {
                              id,
                              nickname: local.nickname.trim(),
                          }
                        : {
                              id,
                              password: password.editCheck,
                          }
                ),
            });

            if (!res.ok) throw new Error();

            if (modalType === "nickname") {
                const updatedInfo = {
                    id,
                    nickname: local.nickname.trim(),
                };

                onSave(updatedInfo);
                localStorage.setItem(
                    "nickname",
                    updatedInfo.nickname
                );

                onClick();
            } else {
                onClick();
                localStorage.clear();

                alert(
                    "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요."
                );

                router.replace("/login");
            }
        } catch {
            setErrorMessage("정보 변경 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/70
                px-4 py-6"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClick();
                }
            }}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="change-modal-title"
                className="
                    w-full max-w-[600px]
                    max-h-[90vh] overflow-y-auto
                    rounded-xl
                    border border-[#606060]
                    bg-[#404040]
                    p-6 text-white
                    shadow-2xl
                    sm:p-8" >
                
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="change-modal-title"
                            className="text-xl font-semibold">
                            {modalType === "nickname"
                                ? "닉네임 변경"
                                : "비밀번호 변경"}
                        </h2>

                        <p className="mt-2 text-sm text-gray-300">
                            {modalType === "nickname"
                                ? "사용할 새로운 닉네임을 입력해주세요."
                                : "계정 보안을 위해 비밀번호를 변경합니다."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClick}
                        aria-label="닫기"
                        className="
                            rounded-md p-1
                            text-gray-300
                            transition-colors
                            hover:bg-[#4A4A4A]
                            hover:text-white
                            cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="my-6 border-t border-[#606060]" />

                {modalType === "nickname" ? (
                    <div>
                        <label
                            htmlFor="nickname"
                            className="mb-2 block text-sm font-medium">
                            닉네임
                        </label>

                        <div className="flex gap-2">
                            <input
                                id="nickname"
                                name="nickname"
                                type="text"
                                value={local.nickname}
                                onChange={onChangeLocal}
                                placeholder="새 닉네임"
                                className="
                                    w-full min-w-0
                                    rounded-lg
                                    border border-[#606060]
                                    bg-[#343333]
                                    px-4 py-3
                                    text-sm text-white
                                    outline-none
                                    transition-colors
                                    focus:border-[#909090]"/>

                            <button
                                type="button"
                                onClick={onClickDuplication}
                                disabled={isLoading}
                                className="
                                    shrink-0 rounded-lg
                                    bg-[#555555]
                                    px-4 py-3
                                    text-sm font-medium
                                    transition-colors
                                    hover:bg-[#606060]
                                    disabled:opacity-50
                                    cursor-pointer
                                "
                            >
                                중복확인
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {[
                            {
                                label: "현재 비밀번호",
                                name: "now",
                                value: password.now,
                                placeholder: "현재 비밀번호 입력",
                            },
                            {
                                label: "새 비밀번호",
                                name: "edit",
                                value: password.edit,
                                placeholder: "새 비밀번호 입력",
                            },
                            {
                                label: "새 비밀번호 확인",
                                name: "editCheck",
                                value: password.editCheck,
                                placeholder: "새 비밀번호 다시 입력",
                            },
                        ].map((field) => (
                            <div key={field.name}>
                                <label
                                    htmlFor={field.name}
                                    className="mb-2 block text-sm font-medium">
                                    {field.label}
                                </label>

                                <input
                                    id={field.name}
                                    type="password"
                                    name={field.name}
                                    value={field.value}
                                    onChange={onChangePW}
                                    placeholder={field.placeholder}
                                    autoComplete={
                                        field.name === "now"
                                            ? "current-password"
                                            : "new-password"
                                    }
                                    className="
                                        w-full rounded-lg
                                        border border-[#606060]
                                        bg-[#343333]
                                        px-4 py-3
                                        text-sm text-white
                                        outline-none
                                        transition-colors
                                        focus:border-[#909090]"/>
                            </div>
                        ))}
                    </div>
                )}

                {errorMessage && (
                    <div
                        role="alert"
                        className="mt-4 flex items-center gap-2 text-sm text-red-400">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
                        <CheckCircle2 size={16} className="shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                )}

                <div className="my-6 border-t border-[#606060]" />

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClick}
                        className="
                            rounded-lg
                            border border-[#606060]
                            px-5 py-2.5
                            text-sm font-medium
                            transition-colors
                            hover:bg-[#4A4A4A]
                            cursor-pointer">
                        취소
                    </button>

                    <button
                        type="button"
                        onClick={onClickEdit}
                        disabled={isLoading}
                        className="
                            rounded-lg
                            bg-[#E5E5E5]
                            px-5 py-2.5
                            text-sm font-semibold
                            text-[#242424]
                            transition-colors
                            hover:bg-white
                            disabled:opacity-50
                            cursor-pointer">
                        {isLoading ? "처리 중..." : "변경하기"}
                    </button>
                </div>
            </div>
        </div>
    );
};