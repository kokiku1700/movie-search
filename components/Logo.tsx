import Link from "next/link";

type Props = {
    loc?: string;
}

export default function Logo ({ loc }: Props) {

    return(
        <Link 
            href={"/"}
            className={`
                text-3xl 
                cursor-pointer
                ${loc && "text-black"} 
                hover:text-shadow-lg
                hover:${loc ? "text-shadow-white" : "text-shadow-black"}  
                sm:text-4xl 
                xl:text-5xl
            `}
        >
            D.MS
        </Link>
    )
}