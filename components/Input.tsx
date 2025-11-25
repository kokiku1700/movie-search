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
    const [valid, setValid] = useState<boolean | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        onChange(val);

        if ( validate ) {
            const isValid = validate(val, pwValue);
            setValid(isValid);
            onValidate?.(isValid);
        } 
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