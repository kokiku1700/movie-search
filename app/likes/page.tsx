"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/components/LikeButton";

// 영화 각각의 정보의 타입
interface Movie {
    id: number;
    title?: string;
    name?: string;
    original_title: string;
    backdrop_path: string | null;
    poster_path: string | null;
    overview: string;
    release_date: string;
    media_type: string;
}

export default function Likes () {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function getLikeMovies () {
            const id = localStorage.getItem("id");
            const res = await fetch('/api/likes', {
                method: "POST",
                body: JSON.stringify({ action: "getLikeMovies", user: {user_id: id}})
            });
            const data = await res.json();
            const likeMoviesData: [number, string][] = data.likes;
            
            const moviePromises = likeMoviesData.map(async(data) => {
                const res = await fetch(`https://api.themoviedb.org/3/${data[1]}/${data[0]}?language=ko`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
                    }
                });
                const movie: Movie[] = await res.json();
                // movie가 배열로 들어오는 문제가 생김
                // 때문에 배열인지 확인 
                const newMovie = Array.isArray(movie) ? movie[0] : movie;

                return {...newMovie, media_type: data[1]}
            });
            // moviePromises가 여러 개의 프로미스를 반환한다.
            // 반환한 모든 프로미스를 moviedata에 저장
            
            const moviedata: Movie[] = await Promise.all(moviePromises);
            
            setMovies(moviedata);
        }
        getLikeMovies();
    }, []);

    return (
        <div className="w-[95%] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,200px))] gap-4">
            {movies.map(movie => (
                <div key={movie.id} className="relative overflow-hidden">
                    <p className="text-center whitespace-nowrap">{movie.title || movie.name}</p>
                    <Link href={`/movie/${movie.id}`}
                        className="
                            relative block aspect-[2/3] rounded-lg 
                            overflow-hidden
                            hover:border-2">
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name || "poster"} 
                            fill 
                            className="
                            object-cover cursor-pointer
                            "/>
                    </Link>
                    <LikeButton movieId={movie.id} mediaType={movie.media_type} />                  
                </div>
                
            ))}
        </div>
    )
}