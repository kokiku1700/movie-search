import { useState } from "react";

type Input = {
    type: string;
    value: string;
    onChange: (value: string) => void;
    onValidate?: (isvalid: boolean) => void;
    validate?: (value: string, pwCheck?: {password?: string}) => boolean;
    pwValue?: {password?: string};
    placeholder?: string;
}

export default function Input ({type, value, onChange, onValidate, pwValue, validate, placeholder }: Input) {
    // border 색을 컨트롤하기 위한 변수
    const [valid, setValid] = useState<boolean | null>(null);
    
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        onChange(val);

        let isValid = true;

        // 비밀번호와 비밀번호 확인을 비교하기 위한 코드
        if ( validate ) {
            isValid = validate(val, pwValue);
        };

        // 닉네임과 아이디의 중복을 체크하는 코드
        try {
            let apiUrl = "";

            if ( type === "name" ) apiUrl = `/api/check_nickname?nickname=${val}`;
            else if ( type === "id" ) apiUrl = `/api/check_id?id=${val}`;
            
            if ( apiUrl ) {
                const res = await fetch(apiUrl);
                const data = await res.json();
                
                if ( data.success ) isValid = false;
            }
        } catch ( err ) {
            console.log(err);
            isValid = false;
        }
        setValid(isValid);
        onValidate?.(isValid);
    }

    return (
        <input 
            className={`
                w-[60%]
                text-xl text-black
                bg-white rounded-2xl 
                px-4 p-3 my-3
                border-2
                ${valid === null ? "border-gray-200" : valid ? "border-green-500" : "border-red-500"}
                focus:outline-none 
            `}
            type={type}
            value={value}
            onChange={handleChange}

            placeholder={placeholder}
        />
    )
}