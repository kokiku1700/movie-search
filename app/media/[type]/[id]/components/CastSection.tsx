"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, UserRound } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

type Cast = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

export default function CastSection({ cast }: { cast: Cast[] }) {
    if (!cast?.length) return null;

    return (
        <section className="my-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="flex items-end gap-3 text-3xl font-semibold">
                    출연진
                </h2>

                <div className="flex gap-2">
                    <button
                        className="cast-prev p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                        aria-label="이전 출연진"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        className="cast-next p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                        aria-label="다음 출연진"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: ".cast-prev",
                    nextEl: ".cast-next",
                }}
                slidesPerView="auto"
                spaceBetween={16}
                className="w-full"
            >
                {cast.map((c) => (
                    <SwiperSlide
                        key={c.id}
                        className="!w-[140px] sm:!w-[170px] md:!w-[190px]"
                    >
                        <div className="group">
                            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-[#252932]">
                                {c.profile_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w342${c.profile_path}`}
                                        alt={c.name}
                                        fill
                                        sizes="(max-width: 640px) 140px, (max-width: 768px) 170px, 190px"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-500">
                                        <UserRound size={48} strokeWidth={1.2} />
                                    </div>
                                )}
                            </div>

                            <div className="mt-3">
                                <h3 className="font-semibold truncate">
                                    {c.name}
                                </h3>
                                <p className="text-sm text-gray-400 truncate">
                                    {c.character || "배역 정보 없음"}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}