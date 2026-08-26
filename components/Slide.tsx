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
import { Movie } from "@/type/media";

// 전달 받은 tmdb api와 슬라이드 제목의 타입
type Props = {
    url: string;
    subject: string;
    mediaType?: string;
};

interface Movies {
    results: Movie[];
};


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
            const res =  await fetch(`/api/tmdb/slide?mediaType=${mediaType}&url=${url}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            
            const data: Movies = await res.json();
            const result = data.results.map(item => ({
                ...item,
                media_type: item.media_type || mediaType,
            }));

            setMovies(result);
        };
        
        getMovieData();
    }, []);

    return (
        <div className="w-[92%] mx-auto py-8 relative">
            {/* 제목 */}
            <div className="mb-5 flex items-center gap-3">
                <div className="w-1 h-8 rounded-full bg-sky-400" />

                <h1 className="
                    text-2xl md:text-3xl lg:text-4xl
                    font-bold text-white">
                    {subject}
                </h1>
            </div>
            <div className="mt-3 h-px bg-gradient-to-r from-sky-400/50 via-white/10 to-transparent" />

            {/* 이전 버튼 */}
            <button
                ref={prevRef}
                aria-label="이전 슬라이드"
                className="
                    group
                    absolute left-[-2%] top-[55%]
                    -translate-y-1/2
                    z-20

                    flex items-center justify-center
                    size-11 lg:size-14

                    rounded-full
                    bg-black/40
                    backdrop-blur-sm
                    border border-white/10

                    opacity-70
                    transition-all duration-200

                    hover:opacity-100
                    hover:bg-sky-500/90
                    hover:scale-105

                    cursor-pointer">
                <Image
                    src={prev}
                    alt=""
                    width={36}
                    height={36}
                    className="
                        transition-transform duration-200
                        group-hover:-translate-x-0.5"/>
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
                }}
                className="
                    overflow-hidden
                    py-2">
                {movies.map((movie, i) => (
                    <SwiperSlide
                        key={movie.id}
                        className="!w-auto">
                        <div
                            className="
                                w-[150px] lg:w-[200px]
                                transition-transform
                                duration-300
                                hover:-translate-y-1">
                            <PosterCard
                                id={movie.id}
                                titleAndName={movie.title || movie.name}
                                mediaType={movie.media_type || "movie"}
                                posterPath={movie.poster_path}
                                idx={i}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 다음 버튼 */}
            <button
                ref={nextRef}
                aria-label="다음 슬라이드"
                className="
                    group
                    absolute right-[-2%] top-[55%]
                    -translate-y-1/2
                    z-20

                    flex items-center justify-center
                    size-11 lg:size-14

                    rounded-full
                    bg-black/40
                    backdrop-blur-sm
                    border border-white/10

                    opacity-70
                    transition-all duration-200

                    hover:opacity-100
                    hover:bg-sky-500/90
                    hover:scale-105

                    cursor-pointer">
                <Image
                    src={next}
                    alt=""
                    width={36}
                    height={36}
                    className="
                        transition-transform duration-200
                        group-hover:translate-x-0.5"/>
            </button>
        </div>
    );
};