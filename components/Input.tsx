import { Dispatch, SetStateAction, useState } from "react";
import { InputField, validation } from "@/domains/validate";

type Input = {
    type: InputField;
    value: string;
    kind?: string;
    onChange: (value: string) => void;
    onValidate?: (isvalid: boolean) => void;
    validate?: (value: string, pwCheck?: {password?: string}) => boolean;
    pwValue?: {password?: string};
    placeholder?: string;
    setErrorState?: Dispatch<SetStateAction<boolean | null>>;
    setErrorMessage?: Dispatch<SetStateAction<string>>;
}

export default function Input ({type, value, kind, onChange, setErrorMessage, setErrorState, onValidate, pwValue, validate, placeholder }: Input) {
    // border 색을 컨트롤하기 위한 변수
    const [valid, setValid] = useState<boolean | null>(null);
    
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    // 닉네임과 아이디의 중복을 체크하는 코드
    // 중복은 해당 input에서 포커스가 사라졌을 때 실행
    const onBlur = async() => {
        const field = type;
        // 로그인과 회원가입인 경우를 분리
        if ( kind === "signup" ) {
            let apiUrl = "";

            if ( type === "name" ) apiUrl = `/api/check_nickname?nickname=${value}`;
            else if ( type === "id" ) apiUrl = `/api/check_id?id=${value}`;
            
            // apiUrl이 참인 경우는 해당 input이 닉네임 혹은 아이디인 경우다.
            if ( apiUrl ) {
                const res = await fetch(apiUrl);
                const data = await res.json();
                
                // data.success가 참이라는 것은 이미 존재하는 아이디이다.
                if ( data.success ) {
                    setValid(false);
                    onValidate?.(false);
                    setErrorState?.(false);
                    setErrorMessage?.(`이미 존재하는 ${type === "name" ? "닉네임" : "아이디"}입니다.`)
                } else {
                    //validate가 존재할 경우 
                    // 즉, 정규식이 있다면 정규식으로 입력값을 검증한다.
                    if ( validate ) {
                        let isValid = validate(value, pwValue);
                        setValid(isValid);
                        onValidate?.(isValid);
                        setErrorState?.(isValid);
                        // 검증 후 정규식과 다르면 에러 메세지를 보낸다.
                        if ( !isValid ) {
                            setErrorMessage?.(validation[field].error);
                        }
                    } else {
                        setValid(false);
                        onValidate?.(false);
                        setErrorState?.(false);
                    }
                }
            // 비밀번호화 비밀번호 확인을 관리한다.
            } else if ( validate ) {
                let isValid = true;
                isValid = validate(value, pwValue);
                setValid(isValid);  
                onValidate?.(isValid);
                setErrorState?.(isValid);

                // 경고 메세지를 비밀번호화 비밀번호 확인으로 분리했다.
                if ( !isValid ) {
                    if ( pwValue ) {
                        setErrorMessage?.("비밀번호를 확인해주세요.")
                    } else {
                        setErrorMessage?.(validation[field].error);
                    }
                }
            }
        } else {
            return;
        }
    };

    return (
        <input 
            className={`
                w-[100%]
                text-xl text-black
                bg-white rounded-2xl 
                px-4 p-3 mt-3 mb-1
                border-2
                ${valid === null ? "border-gray-200" : valid ? "border-sky-500" : "border-red-500"}
                focus:outline-none
                focus:shadow-md
                focus:shadow-white
            `}
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
        />
    )
}