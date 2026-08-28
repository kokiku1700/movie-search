import Image from "next/image"
import searchButton from "@/public/searchButton.png";

type Props = {
    onClick: () => void;
}

export default function SearchButton ( {onClick}: Props ) {
    return (
        <div className="
            w-8 h-8
            absolute right-[10%] 
            cursor-pointer
            xl:w-12 xl:h-12">
            <Image 
                src={searchButton}
                alt="검색 버튼" 
                fill
                onClick={onClick}
            />  
        </div>
    );
};