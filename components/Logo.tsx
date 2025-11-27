import Link from "next/link";

type Props = {
    loc?: string;
}

export default function Logo ({ loc }: Props) {

    return(
        <Link 
            href={"/"}
            className={`
                text-5xl cursor-pointer
                ${loc && "text-black"}    
            `}
        >
            D.MS
        </Link>
    )
}