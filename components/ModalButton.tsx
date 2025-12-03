
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
                mx-5 p-2
                ${color === "black" ? `text-${color}` : `text-${color}-500`}
                cursor-pointer
            `}
            name={name}
            onClick={onClick}
        >
            {content}
        </button>
    )
}