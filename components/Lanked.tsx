
type Props = {
    lank: number;
};

const lankStyle = [
    "text-[7vw] text-amber-400",
    "text-[6vw] text-zinc-300",
    "text-[5vw] text-[#B87333]",
];

function getLankStyle ( index: number) {
    return lankStyle[index - 1] ?? "text-[4vw] text-zinc-500";
}

export default function Lanked ({lank}: Props) {

    return (
        <span
            className={`
                absolute top-[-30] left-[-20] z-55
                font-blackhansans leading-none 
                pointer-events-none text-shadow-sm text-shadow-gray-700
                ${getLankStyle(lank)}`}>
            {lank}
        </span>
    )
}