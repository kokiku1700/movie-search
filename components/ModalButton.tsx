
type Props = {
    content: string;
    onClick: () => void;
    color?: string
}

export default function ModalButton ({ content, onClick, color }: Props) {


    return (
        <button
            className={`
                mx-5 p-2
                ${color ? "text-red-500" : "text-green-500"}
                cursor-pointer    
            `}
            onClick={onClick}
        >
            {content}
        </button>
    )
}