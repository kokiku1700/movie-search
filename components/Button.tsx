interface ButtonProps {
    content: string;
}

export default function Button ( props: ButtonProps ) {

    return (
        <button
            className="
                w-[60%]
                text-xl text-black text-black
                bg-[#FAFAFA]
                rounded-4xl
                p-3 my-3
                cursor-pointer
            "
        >
            {props.content}
        </button>
    )
}