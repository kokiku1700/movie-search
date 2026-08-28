"use client";

import { Movie } from "@/type/media";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import VideoModal from "./VideoModal";

type Props = {
    nowPlayingMovies: Movie[];
};

export default function NowPlayingMovieList ({ nowPlayingMovies }: Props) {
    const [mediaId, setMediaId] = useState<number | null>(null);

    const handleMediaId = (id: number) => {
        setMediaId(id);
    };

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <p className="mb-1 text-sm font-medium text-sky-400">
                        NOW PLAYING
                    </p>

                    <h2 className="text-2xl font-bold text-white">
                        현재 상영 중인 영화
                    </h2>
                </div>

                <Link
                    href="/now-playing"
                    className="
                        text-sm text-zinc-400
                        transition-colors
                        hover:text-white">
                    전체보기 →
                </Link>
            </div>

            {/* 영화 grid */}
            <div
                className="
                    grid grid-cols-1 gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4">
                {nowPlayingMovies.slice(0, 8)
                    .map((movie: Movie) => (
                        <div key={movie.id}>
                            <div 
                                className="
                                    group relative
                                    m-5
                                    transition
                                    duration-300
                                    hover:-translate-y-1">
                                <Link
                                    href={`/media/movie/${movie.id}`}
                                    className="
                                        flex
                                        overflow-hidden
                                        rounded-xl
                                        bg-zinc-900
                                        hover:bg-zinc-800">
                                    {/* 포스터 */}
                                    <div className="relative aspect-[2/3] w-28 shrink-0">
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                            alt={movie.title ?? ""}
                                            fill
                                            sizes="112px"
                                            className="
                                                object-cover
                                                transition-transform
                                                duration-300
                                                group-hover:scale-105"/>
                                    </div>

                                    {/* 영과 간단 정보 */}
                                    <div className="flex min-w-0 flex-1 flex-col p-4">
                                        <h3
                                            className="
                                                line-clamp-2
                                                font-semibold
                                                text-white">
                                            {movie.title}
                                        </h3>

                                        <div className="mt-2 flex items-center gap-1 text-sm">
                                            <span className="text-sky-400">
                                                ★
                                            </span>

                                            <span className="text-zinc-300">
                                                {movie.vote_average.toFixed(1)}
                                            </span>
                                        </div>

                                        <div className="mt-auto">
                                            <p className="text-xs text-zinc-500">
                                                개봉일
                                            </p>

                                            <p className="mt-0.5 text-sm text-zinc-300">
                                                {movie.release_date}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                {/* 미리보기(영상)탭 */}
                                <button
                                    type="button"
                                    onClick={() => handleMediaId(movie.id)}
                                    className="
                                        w-[80%]
                                        absolute left-1/2 top-full
                                        z-10
                                        -translate-x-1/2 -translate-y-2
                                        
                                        rounded-b-lg 
                                        bg-zinc-800
                                        px-5 py-2
                                        
                                        text-sm text-zinc-200
                                        
                                        opacity-100
                                        pointer-events-auto
                                        cursor-pointer

                                        transition-all duration-300

                                        lg:pointer-events-none
                                        lg:opacity-0
                                        lg:group-hover:translate-y-0
                                        lg:group-hover:opacity-100
                                        lg:group-hover:pointer-events-auto
                                        
                                        hover:text-sky-400">
                                    ▶ 미리보기
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            {mediaId && <VideoModal mediaId={mediaId} setMediaId={setMediaId}/>}
        </div>
    )
}