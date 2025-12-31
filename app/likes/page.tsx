"use client";

import PosterCard from "@/components/PosterCard";
import { useLikeMoviesQuery } from "@/hooks/useLikeMoviesQuery";
import { useLikeMoviesDetailQuery } from "@/hooks/useLikeMoviesDetailQuery";

export default function Likes () {
    const userId = typeof window !== "undefined" ? localStorage.getItem("id") : null;
    const { data: likeMovies = [], isLoading: isLikeLoading, } = useLikeMoviesQuery(userId, "all");
    const { data: movies = [], isLoading: isMoviesLoading } = useLikeMoviesDetailQuery(likeMovies, !!userId);

    if ( isLikeLoading || isMoviesLoading ) {
        return <p className="text-center my-20">로딩 중...</p>
    };

    if ( movies.length === 0 ) {
        return (
            <p className="flex justify-center items-center my-50">
                찜한 작품이 없습니다.
            </p>
        )
    }

    return (
        <>
            {movies.length === 0 
                ?
                <div>
                    {movies.length === 0 && <p className="col-span-full flex justify-center items-center my-50">찜한 작품이 없습니다.</p>}
                </div>
                :
                <div className="
                    w-[95%] mx-auto 
                    grid grid-cols-[repeat(auto-fit,minmax(150px,150px))] 
                    justify-center gap-4
                    lg:grid-cols-[repeat(auto-fit,minmax(200px,200px))] ">
                    {movies.map((movie, i) => (
                        <PosterCard 
                            key={movie.id}
                            id={movie.id} 
                            titleAndName={movie.title || movie.name} 
                            mediaType={movie.media_type || "movie"} 
                            posterPath={movie.poster_path} 
                            idx={i} />
                    ))}
                </div>
            }
        </>
    )
}