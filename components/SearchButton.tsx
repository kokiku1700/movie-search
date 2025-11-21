import Image from "next/image"
import searchButton from "@/public/searchButton.png";
import { useRouter, usePathname } from "next/navigation";

type Props = {
    keyword: string;
}

export default function SearchButton ( {keyword}: Props ) {
    const router = useRouter();
    const pathname = usePathname();

    const handlerSearch = () => {
        if ( keyword !== "" ) {
            if ( pathname === "/list") router.replace(`/list?q=${keyword}`, undefined, {shallow: true});
            else router.push(`/list?q=${keyword}`);
        } else {
            console.log("제목을 입력해주세요!!")
        }
    };

    return (
        <Image 
            src={searchButton}
            alt="검색 버튼" 
            width={40}
            height={40}
            onClick={handlerSearch}
            className="absolute right-[31%] cursor-pointer"
        />        
    )
}