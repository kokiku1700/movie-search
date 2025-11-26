type Props = {
    content: string;
    onClick: () => void;
};

export default function ExistButton ({ content, onClick }: Props) {

    return (
        <button 
            className="
                w-[20%]
                text-base text-black
                bg-[#FAFAFA]
                rounded-2xl
                p-3 my-3
                cursor-pointer
            "
            onClick={onClick}
        >
            {content}
        </button>
    )
}