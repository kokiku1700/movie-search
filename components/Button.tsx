interface ButtonProps {
    content: string;
}

export default function Button ( props: ButtonProps ) {

    return (
        <button
            className="
                w-1/14
                text-2xl
                text-black
                bg-gray-200
                rounded-xl
                p-3
                cursor-pointer
            "
        >
            {props.content}
        </button>
    )
}