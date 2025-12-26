import { Dispatch, SetStateAction, useState } from "react";

type Input = {
    type: string;
    value: string;
    kind?: string;
    onChange: (value: string) => void;
    onValidate?: (isvalid: boolean) => void;
    validate?: (value: string, pwCheck?: {password?: string}) => boolean;
    pwValue?: {password?: string};
    placeholder?: string;
    setErrorState: Dispatch<SetStateAction<boolean>>;
}

export default function Input ({type, value, kind, onChange, setErrorState, onValidate, pwValue, validate, placeholder }: Input) {
    // border 색을 컨트롤하기 위한 변수
    const [valid, setValid] = useState<boolean | null>(null);
    
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        // setErrorState(false);
        onChange(val);

        // Input 컴포넌트는 로그인과 회원가입에서 다루고 있음
        // 로그인 폼에 있는 input은 입력한 값이 맞는지만 체크하면 되기 때문에
        // 회원가입 폼에 있는 input에만 "signup"이라는 kind를 전달함
        if ( kind === "signup" && validate ) {
            let isValid = true;
            // validate가 존재하면 조건문 실행. 
            // 이 조건문 또한 로그인 폼과 차별화를 두기 위해 작성.
            // 참고로 validate는 정규식으로 참 거짓 판별.
            isValid = validate(val, pwValue);
            setValid(isValid);  
            onValidate?.(isValid);
        };
    };

    // 닉네임과 아이디의 중복을 체크하는 코드
    // 중복은 해당 input에서 포커스가 사라졌을 때 실행
    const onBlur = async() => {
        if ( kind !== "signup" ) return;
        if ( valid !== true ) return;

        try {
            let apiUrl = "";

            if ( type === "name" ) apiUrl = `/api/check_nickname?nickname=${value}`;
            else if ( type === "id" ) apiUrl = `/api/check_id?id=${value}`;
                
            if ( apiUrl ) {
                const res = await fetch(apiUrl);
                const data = await res.json();
                
                if ( data.success ) {
                    setValid(false);
                    onValidate?.(false);
                }
            }
        } catch ( err ) {
            setValid(false);
            onValidate?.(false);        
        }
        console.log(valid)
    };

    return (
        <input 
            className={`
                w-[100%]
                text-xl text-black
                bg-white rounded-2xl 
                px-4 p-3 mt-3 mb-1
                border-2
                ${valid === null ? "border-gray-200" : valid ? "border-green-500" : "border-red-500"}
                focus:outline-sky-500
            `}
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
        />
    )
}