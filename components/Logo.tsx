import Link from "next/link";
import logo from "@/public/logo.svg";
import Image from "next/image";

export default function Logo () {

    return(
        <Link 
            href={"/"}
            className={`
                relative w-50 h-20 block
                cursor-pointer`}>
            <Image 
                src={logo} alt="로고"
                fill/>
        </Link>
    );
};