"use client";

import { Media } from "@/lib/searchGetMovie";
import PosterCard from "./PosterCard";

export default function SearchList ( {medias}: {medias:Media[]}) {

    return (
        <>
            <div className="
                w-[95%] mx-auto 
                grid grid-cols-[repeat(auto-fit,minmax(150px,150px))]
                gap-4 justify-center
                lg:grid-cols-[repeat(auto-fit,minmax(200px,200px))] ">
                {medias.map((media, i) => (
                    <PosterCard 
                        key={media.id}
                        id={media.id} 
                        titleAndName={media.title || media.name} 
                        mediaType={media.media_type || "movie"} 
                        posterPath={media.poster_path} 
                        idx={i} />
                ))}
            </div>   
        </>
    )
}