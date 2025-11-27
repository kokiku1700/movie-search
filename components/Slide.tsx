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

interface Props {
    url: string;
    subject: string;
}

interface Movie {
    id: number;
    title: string;
    original_title: string;
    backdrop_path: string | null;
    poster_path: string | null;
    overview: string;
    release_date: string;
}

interface PopularMovies {
    results: Movie[];
}


export default function MovieSlide ({ url, subject }: Props) {
    const [movies, setMovies] = useState<Movie[]>([]);

    // 전달 받은 url로 작품 목록을 받아온다.
    useEffect(() => {
        async function getMovieData () {
            const res =  await fetch(`https://api.themoviedb.org/3/${url}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
                }
            });
            const data: PopularMovies = await res.json();

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
                            src={emptyHeart} alt="emptyHeart"
                            className="absolute bottom-[1%] right-[1%] cursor-pointer" 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}