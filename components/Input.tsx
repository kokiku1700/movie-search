
type Input = {
    placeholder: string;
}

export default function Input (props: Input) {


    return (
        <input 
            className="
                w-[60%]
                bg-white rounded-xl text-xl p-3 my-3
                focus:outline-none 
            "
            placeholder={props.placeholder}
        />
    )
}