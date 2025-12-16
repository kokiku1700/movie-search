import Image from "next/image"
import searchButton from "@/public/searchButton.png";

type Props = {
    onClick: () => void;
}

export default function SearchButton ( {onClick}: Props ) {
    return (
        <Image 
            src={searchButton}
            alt="검색 버튼" 
            width={40}
            height={40}
            onClick={onClick}
            className="absolute right-[31%] cursor-pointer"
        />        
    )
}