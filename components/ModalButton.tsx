
type Props = {
    content: string;
    onClick: () => void;
    color?: string;
    name?: string;
};

export default function ModalButton ({ content, onClick, color, name }: Props) {

    return (
        <button
            className={`
                mx-5 px-3 py-1
                rounded-xl
                whitespace-nowrap
                ${color === "black" ? `text-${color}` : `text-${color}-500`}
                cursor-pointer
                hover:shadow-md hover:shadow-white
            `}
            name={name}
            onClick={onClick}
        >
            {content}
        </button>
    )
}