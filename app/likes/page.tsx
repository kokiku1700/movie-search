"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLikes } from "@/hooks/useLikes";
import heart from "@/public/heart.png";
import emptyHeart from "@/public/emptyHeart.png";
import Link from "next/link";

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

export default function Likes () {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { likeMovies, toggleHeart } = useLikes();

    useEffect(() => {
        async function getLikeMovies () {
            const id = localStorage.getItem("id");
            const res = await fetch('/api/likes', {
                method: "POST",
                body: JSON.stringify({ action: "getLikeMovies", user: {user_id: id}})
            });
            const data = await res.json();
            const likeMoviesData: number[] = data.likes;
            
            const moviePromises = likeMoviesData.map(id => {
                return fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
                    }
                }).then(res => res.json());
            });

            const moviedata: Movie[] = await Promise.all(moviePromises);
            
            setMovies(moviedata);
        }
        getLikeMovies();
    }, []);

    return (
        <div className="w-[95%] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,200px))] gap-4">
            {movies.map(movie => (
                <div key={movie.id} className="relative overflow-hidden">
                    <p className="text-center whitespace-nowrap">{movie.title}</p>
                    <Link href={`/movie/${movie.id}`}
                        className="
                            relative block aspect-[2/3] rounded-lg 
                            overflow-hidden
                            hover:border-2">
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
                            fill 
                            className="
                            object-cover cursor-pointer
                            "/>
                    </Link>
                    
                    <Image 
                        src={likeMovies.includes(movie.id) ? heart : emptyHeart} 
                        alt={likeMovies.includes(movie.id) ? "heart" : "emptyHeart"}
                        onClick={() => toggleHeart(movie.id)}
                        className="absolute bottom-[1%] right-[1%] cursor-pointer" 
                    />                    
                </div>
                
            ))}
        </div>
    )
}