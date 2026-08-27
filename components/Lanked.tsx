
type Props = {
    lank: number;
};

const lankStyle = [
    "text-8xl text-amber-400 lg:text-9xl",
    "text-7xl text-zinc-300 lg:text-8xl",
    "text-6xl text-[#B87333] lg:text-7xl",
];

function getLankStyle ( index: number) {
    return lankStyle[index - 1] ?? "text-5xl text-zinc-500 lg:text-6xl";
}

export default function Lanked ({lank}: Props) {

    return (
        <span
            className={`
                absolute top-0 left-[-8] z-55
                font-blackhansans leading-none 
                pointer-events-none text-shadow-sm text-shadow-white
                ${getLankStyle(lank)}`}>
            {lank}
        </span>
    )
}