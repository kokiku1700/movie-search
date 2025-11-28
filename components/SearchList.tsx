"use client";

import Image from "next/image";
import Link from "next/link";
import heart from "@/public/heart.png";
import emptyHeart from "@/public/emptyHeart.png";
import { useLikes } from "@/hooks/useLikes";
import { Movie } from "@/lib/searchGetMovie";

export default function SearchList ( {movies}: {movies:Movie[]}) {
    const { likeMovies, toggleHeart } = useLikes();

    return (
        <>
            <div className="w-[90%] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {movies.map(m => (
                    <div key={m.id} className="w-full overflow-hidden">
                        <h3 className="text-center whitespace-nowrap">{m.title}</h3>
                        <div className="relative aspect-[2/3]">
                            <Link href={`/movie/${m.id}`}>
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} 
                                    alt={m.title}
                                    fill
                                    className="object-cover"
                                />
                            </Link>
                            <Image 
                                src={likeMovies.includes(m.id) ? heart : emptyHeart} 
                                alt={likeMovies.includes(m.id) ? "heart" : "emptyHeart"}
                                onClick={() => toggleHeart(m.id)}
                                className="absolute bottom-[1%] right-[1%] cursor-pointer" 
                            />
                        </div>
                    </div>
                ))}
            </div>   
        </>
    )
}