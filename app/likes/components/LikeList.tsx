"use client";

import { useEffect, useState } from "react";
import PosterCard from "@/components/PosterCard";
import { useLikeMoviesQuery } from "@/hooks/useLikeMoviesQuery";
import { useLikeMoviesDetailQuery } from "@/hooks/useLikeMoviesDetailQuery";

export default function LikeList () {
    const [userId, setUserId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const { data: likeMovies = [], isLoading: isLikeLoading, } = useLikeMoviesQuery(userId, "all");
    const { data: likeMoviesDetail = [], isLoading: isDetailLoading } = useLikeMoviesDetailQuery(likeMovies, !!userId);
    
    useEffect(() => {
        setUserId(localStorage.getItem("id"));
        setMounted(true);
    }, []);

    if ( !mounted ) {
        return <p className="text-center my-50">로딩 중...</p>;
    };

    if (!userId) {
        return <p className="text-center my-50">로그인이 필요합니다.</p>;
    };

    if ( isLikeLoading ) {
        return <p className="text-center my-50">로딩 중...</p>;
    };

    if ( likeMovies.length === 0 ) {
        return <p className="col-span-full flex justify-center items-center my-50">찜한 작품이 없습니다.</p>;
    };

    if ( isDetailLoading ) {
        return <p className="text-center my-50">로딩 중...</p>;
    }

    return (
        <>
            {likeMoviesDetail.length > 0 
                &&
                <div className="
                    w-[95%] mx-auto 
                    grid grid-cols-[repeat(auto-fit,minmax(150px,150px))] 
                    justify-center gap-4
                    lg:grid-cols-[repeat(auto-fit,minmax(200px,200px))] ">
                    {likeMoviesDetail.map((movie, i) => (
                        <PosterCard 
                            key={`${movie.media_type}-${movie.id}`}
                            id={Number(movie.id)} 
                            titleAndName={movie.title || movie.name} 
                            mediaType={movie.media_type || "movie"} 
                            posterPath={movie.poster_path} 
                            idx={i} />
                    ))}
                </div>
            }
        </>
    );
};