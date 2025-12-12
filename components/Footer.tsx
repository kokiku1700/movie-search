import tmdb_logo from "@/public/tmdb_logo.svg";
import Image from "next/image";

export default function Footer () {

    return (
        <div className="
            w-full py-20 mt-10 bg-black
            flex flex-col justify-center items-center">
            <Image 
                src={tmdb_logo}
                alt="tmdb logo"
                width={800} />
            <p className="my-5">프로젝트에 사용된 영화 및 TV 시리즈 정보는 TMDB(The Movie Database)에서 제공한 API를 사용합니다.</p>
            <p className="text-xl mt-">"This product uses the TMDB API but is not endorsed or certified by TMDB."</p>
        </div>
    )
};