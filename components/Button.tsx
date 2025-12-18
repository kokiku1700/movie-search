type ButtonProps = {
    content: string;
}

export default function Button ( props: ButtonProps ) {

    return (
        <button
            className="
                w-[60%] text-xl text-black
                bg-[#FAFAFA] rounded-4xl
                p-3 my-3 cursor-pointer
                hover:shadow-sm hover:shadow-sky-200
                hover:text-sky-500
            ">
            {props.content}
        </button>
    )
}