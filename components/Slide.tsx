"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import next from "@/public/next.png";
import prev from "@/public/prev.png";
import PosterCard from "./PosterCard";

// 전달 받은 tmdb api와 슬라이드 제목의 타입
type Props = {
    url: string;
    subject: string;
    mediaType?: string;
}
// 영화 각각의 정보의 타입
interface Movie {
    id: number;
    media_type?: string;
    title?: string;
    name?: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    release_date?: string;
}

interface Movies {
    results: Movie[];
}


export default function MovieSlide ({ url, subject, mediaType }: Props) {
    // 슬라이드에 사용되는 영화 목록을 저장하는 변수
    const [movies, setMovies] = useState<Movie[]>([]);

    // Swiper.js의 이전 버튼, 다음 버튼을 컨트롤하기 위한 useRef
    // 각각 커스텀 버튼을 가리킨다.
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    // 전달 받은 url로 작품 목록을 받아온다.
    useEffect(() => {
        async function getMovieData () {
            const res =  await fetch(`https://api.themoviedb.org/3/${mediaType ? mediaType : ""}${url}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
                }
            });
            const data: Movies = await res.json();
            const result = data.results.map(item => ({
                ...item,
                media_type: item.media_type || mediaType,
            }));

            setMovies(result);
        }
        
        getMovieData();
    }, []);

    return (
        <div className="w-[90%] mx-auto pb-4 relative">
            <h1 className="text-4xl my-3">{subject}</h1>
            <button ref={prevRef} 
                className="
                    z-20
                    absolute left-[-3%] top-1/2 -translate-y-1/2  
                    cursor-pointer ">
                <Image src={prev} alt="prev" width={50} height={50}/>
            </button>
            <Swiper 
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView="auto"
                onSwiper={(swiper) => {   
                    setTimeout(() => {
                        if (!swiper.navigation) return;

                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    });
                }}>
                {movies.map((movie, i) => (
                    <SwiperSlide key={movie.id} className="!w-auto">
                        <div className="w-[150px] lg:w-[200px]">
                            <PosterCard 
                                id={movie.id} 
                                titleAndName={movie.title || movie.name} 
                                mediaType={movie.media_type || "movie"} 
                                posterPath={movie.poster_path} 
                                idx={i} />
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
            <button ref={nextRef} 
                className="absolute right-[-3%] top-1/2 -translate-y-1/2 z-20 cursor-pointer">
                <Image src={next} alt="prev" width={50} height={50}/>
            </button>
        </div>
    )
}