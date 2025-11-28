"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import heart from "@/public/heart.png";
import emptyHeart from "@/public/emptyHeart.png";
import { useLikes } from "@/hooks/useLikes";

// 전달 받은 tmdb api와 슬라이드 제목의 타입
type Props = {
    url: string;
    subject: string;
}
// 영화 각각의 정보의 타입
interface Movie {
    id: number;
    title: string;
    original_title: string;
    backdrop_path: string | null;
    poster_path: string | null;
    overview: string;
    release_date: string;
}

interface Movies {
    results: Movie[];
}


export default function MovieSlide ({ url, subject }: Props) {
    // 슬라이드에 사용되는 영화 목록을 저장하는 변수
    const [movies, setMovies] = useState<Movie[]>([]);
    // 좋아요 커스텀훅
    const { likeMovies, toggleHeart } = useLikes();

    // 전달 받은 url로 작품 목록을 받아온다.
    useEffect(() => {
        async function getMovieData () {
            const res =  await fetch(`https://api.themoviedb.org/3/${url}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
                }
            });
            const data: Movies = await res.json();

            setMovies(data.results);
        }
        getMovieData();
    }, []);

    return (
        <div className="w-[90%] mx-auto pb-4">
            <h1 className="text-4xl my-3">{subject}</h1>
            <Swiper 
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView="auto"
                navigation={true}
            >
                {movies.map(movie => (
                    <SwiperSlide key={movie.id} style={{ width: '200px' }}>
                        <h2 className="overflow-hidden whitespace-nowrap text-center text-xl">{movie.title || movie.original_title || "없음"}</h2>
                        <Link 
                            href={`/movie/${movie.id}`} 
                            className="
                                block aspect-[2/3] w-50 rounded-lg overflow-hidden
                                hover:border-2
                            ">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.original_title || "없음"}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </Link>
                        <Image 
                            src={likeMovies.includes(movie.id) ? heart : emptyHeart} 
                            alt={likeMovies.includes(movie.id) ? "heart" : "emptyHeart"}
                            onClick={() => toggleHeart(movie.id)}
                            className="absolute bottom-[1%] right-[1%] cursor-pointer" 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}