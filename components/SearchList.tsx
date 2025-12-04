"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/searchGetMovie";
import LikeButton from "./LikeButton";

export default function SearchList ( {movies}: {movies:Movie[]}) {

    return (
        <>
            <div className="w-[95%] mx-auto 
                            grid grid-cols-[repeat(auto-fit,minmax(200px,200px))]
                            gap-4 justify-center">
                {movies.map(m => (
                    <div key={m.id} className="relative overflow-hidden">
                        <h3 className="text-center whitespace-nowrap">{m.title}</h3>
                        <Link href={`/movie/${m.id}`}
                            className="
                            relative block aspect-[2/3] rounded-lg 
                            overflow-hidden
                            hover:border-2
                            ">
                            <Image 
                                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} 
                                alt={m.title}
                                fill
                                className="object-cover"
                            />
                        </Link>
                        <LikeButton movieId={m.id} />
                    </div>
                ))}
            </div>   
        </>
    )
}