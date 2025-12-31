import Link from "next/link";

type Props = {
    loc?: string;
}

export default function Logo ({ loc }: Props) {

    return(
        <Link 
            href={"/"}
            className={`
                text-3xl sm:text-4xl
                cursor-pointer
                ${loc && "text-black"} 
                hover:text-shadow-lg
                hover:text-shadow-sky-500   
            `}
        >
            D.MS
        </Link>
    )
}