
type Input = {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export default function Input ({value, onChange, placeholder }: Input) {


    return (
        <input 
            className="
                w-[60%]
                text-xl text-black
                bg-white rounded-2xl 
                px-4 p-3 my-3
                focus:outline-none 
            "
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
        />
    )
}