import tmdb_logo from "@/public/tmdb_logo.svg";
import Image from "next/image";

export default function Footer () {

    return (
        <div className="
            w-full 
            flex flex-col justify-center items-center
            py-10 mt-10 px-10 
            text-center
            bg-black
            xl:py-20">
            <Image 
                src={tmdb_logo}
                alt="tmdb logo"
                width={800} />
            <p className="my-5 text-sm lg:text-base">프로젝트에 사용된 영화 및 TV 시리즈 정보는 TMDB(The Movie Database)에서 제공한 API를 사용합니다.</p>
            <p className="text-sm lg:text-base">"This product uses the TMDB API but is not endorsed or certified by TMDB."</p>
        </div>
    )
};