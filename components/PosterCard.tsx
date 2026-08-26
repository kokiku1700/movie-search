"use client"

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { useState } from "react";

type Props = {
    id: number;
    titleAndName?: string;
    mediaType: string;
    posterPath:string;
    idx?: number;
    lanked: boolean;
    voteAverage: number;
}

export default function PosterCard ({id, titleAndName, mediaType, posterPath, voteAverage, lanked, idx}: Props) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative overflow-hidden"> 
            <div 
                className={`
                    ${lanked ? "flex" : "hidden"}
                    justify-center items-center gap-1`}>
                <span className="relative -top-[2px] text-sky-400">
                    ★
                </span>
                <span>
                    {voteAverage.toFixed(1)}
                </span>
            </div>  
            
            <div className="relative group">
                <span className="
                    absolute inset-0 flex items-center justify-center
                    px-2 py-1 rounded-lg bg-black/60 text-white text-md text-center
                    z-50 opacity-0 pointer-events-none
                    group-hover:opacity-100 transition-opacity">
                    {titleAndName}
                </span>
                <Link 
                    href={`/media/${mediaType}/${id}`} 
                    className="
                        relative block aspect-[2/3] 
                        rounded-lg overflow-hidden">
                    {!loaded && (
                        <div className="absolute inset-0 bg-zinc-700 animate-pulse"></div>
                    )}
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                        alt={titleAndName || "poster"}
                        fill
                        sizes="200px"
                        priority={idx === 0}
                        className={`
                            object-cover transition-opacity duration-300
                            ${loaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setLoaded(true)}
                    />
                </Link>
                <LikeButton movieId={id} mediaType={mediaType} />
            </div>
            <h2 className="
                my-1 
                overflow-hidden truncate whitespace-nowrap 
                text-center text-base
                lg:text-xl">
                {} {titleAndName}
            </h2>
        </div>
    )
};