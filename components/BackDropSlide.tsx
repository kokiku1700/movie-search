"use client";

import { Movie } from "@/type/media";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";


type Props = {
    data: Movie[];
}

export default function BackDropSlide ({ data }: Props) {
    console.log(data)
    return (
        <div>
            <Swiper
                className="hero-swiper w-full h-[80vh]"
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                loop
                speed={1500}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
            >
                {data.map((media, idx) => {
                    const title = media.title ?? media.name;
                    const releaseDate =
                        media.release_date ?? media.first_air_date;

                    return (
                        <SwiperSlide
                            key={`${media.media_type}-${media.id}`}
                            className="relative w-full h-full"
                        >
                            {/* 백드롭 */}
                            {media.backdrop_path && (
                                <Image
                                    src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
                                    alt={title || ""}
                                    fill
                                    priority={idx === 0 || idx === 1}
                                    sizes="100vw"
                                    className="object-cover"/>)}

                            {/* 전체적으로 이미지 어둡게 */}
                            <div className="absolute inset-0 bg-black/20" />

                            {/* 왼쪽 → 오른쪽 그라데이션 */}
                            <div
                                className="
                                    absolute inset-0
                                    bg-gradient-to-r
                                    from-black/90
                                    via-black/55
                                    to-transparent"/>

                            {/* 아래쪽 그라데이션 */}
                            <div
                                className="
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-black/80
                                    via-transparent
                                    to-transparent"/>

                            {/* 콘텐츠 */}
                            <div
                                className="
                                    relative z-10
                                    flex h-full items-end
                                    px-6 pb-24
                                    sm:px-10
                                    lg:px-16
                                    xl:px-24">
                                <div className="max-w-2xl text-white">
                                    <span
                                        className="
                                            mb-4 inline-block
                                            text-sm font-medium
                                            text-amber-400">
                                        실시간 인기 작품
                                    </span>

                                    <h2
                                        className="
                                            text-4xl font-bold leading-tight
                                            sm:text-5xl
                                            lg:text-6xl">
                                        {title}
                                    </h2>

                                    <div
                                        className="
                                            mt-5 flex items-center gap-3
                                            text-sm text-zinc-300
                                            sm:text-base">
                                        <span className="text-amber-400">
                                            ★ {media.vote_average.toFixed(1)}
                                        </span>

                                        {releaseDate && (
                                            <>
                                                <span>·</span>
                                                <span>
                                                    {releaseDate.slice(0, 4)}
                                                </span>
                                            </>
                                        )}

                                        <span>·</span>

                                        <span>
                                            {media.media_type === "movie"
                                                ? "영화"
                                                : "TV"}
                                        </span>
                                    </div>

                                    <p
                                        className="
                                            mt-5
                                            line-clamp-3
                                            max-w-xl
                                            text-sm leading-7
                                            text-zinc-300
                                            sm:text-base">
                                        {media.overview ? media.overview : "제공되는 줄거리 없음"}
                                    </p>

                                    <div className="mt-8">
                                        <Link
                                            href={`/${media.media_type}/${media.id}`}
                                            className="
                                                inline-flex
                                                items-center
                                                rounded-lg
                                                bg-white
                                                px-6 py-3
                                                text-sm font-semibold
                                                text-zinc-900
                                                transition
                                                hover:bg-zinc-200">
                                            자세히 보기
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};