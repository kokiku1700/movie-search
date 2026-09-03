"use client";

import { Movie } from "@/type/media";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    handlerSearch: (word: string) => void;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchDropDown ({ handlerSearch, search, setSearch }: Props) {
    const [recentWords, setRecentWords] = useState<string[]>([]);
    const [searchSuggestion, setSearchSuggestion] = useState<Movie[]>([]);

    // 로컬 스토리지에 저장되어 있는 최근 검색어 불러옴
    useEffect(() => {
        const getWords = localStorage.getItem("word") ?? "[]";
        setRecentWords(JSON.parse(getWords));
    }, [])

    useEffect(() => {
        const getSearchSuggestions = async () => {
            const res = await fetch(`/api/tmdb/search?query=${encodeURIComponent(search)}`);
            const data = await res.json();

            setSearchSuggestion(data);
        };

        getSearchSuggestions();

    }, [search])

    // 최근 검색어 삭제를 담당
    const handleWordRemove = (word: string) => {
        const newWrods = recentWords.filter((w: string) => w !== word);

        setRecentWords(newWrods);
        localStorage.setItem("word", JSON.stringify(newWrods));
    };

    return (
        <div
            className="
                absolute top-full left-0 z-50
                w-full
                pt-2">
            <div
                className="
                    w-[90%] max-h-[520px]
                    mx-auto overflow-y-auto
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    text-black
                    shadow-xl
                    sm:w-[80%]">
                {/* 최근 검색어 */}
                <section className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-semibold text-gray-800">
                            최근 검색어
                        </h5>

                        {recentWords.length > 0 && (
                            <span className="text-xs text-gray-400">
                                {recentWords.length}개
                            </span>
                        )}
                    </div>

                    {recentWords.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {recentWords.map((word: string) => (
                                <div
                                    key={word}
                                    className="
                                        group
                                        flex items-center
                                        overflow-hidden
                                        rounded-full
                                        bg-gray-100
                                        text-sm text-gray-700
                                        transition-colors duration-200
                                        hover:bg-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearch(word);
                                            handlerSearch(word);
                                        }}
                                        className="
                                            px-3 py-1.5
                                            cursor-pointer">
                                        {word}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleWordRemove(word)}
                                        aria-label={`${word} 검색어 삭제`}
                                        className="
                                            px-2 py-1.5
                                            text-gray-400
                                            cursor-pointer
                                            transition-colors duration-200
                                            hover:text-gray-700">
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">
                            최근 검색어가 없습니다.
                        </p>
                    )}
                </section>

                {/* 관련 작품 */}
                <section className="p-2">
                    <div className="px-2 py-2">
                        <h5 className="text-sm font-semibold text-gray-800">
                            관련 작품
                        </h5>
                    </div>

                    {searchSuggestion.length > 0 ? (
                        <ul className="space-y-1">
                            {searchSuggestion.map(production => {
                                const title =
                                    production.media_type === "movie"
                                        ? production.title
                                        : production.name;

                                const date =
                                    production.media_type === "movie"
                                        ? production.release_date
                                        : production.first_air_date;

                                return (
                                    <li
                                        key={`${production.media_type}_${production.id}`}>
                                        <Link
                                            href={`/media/${production.media_type}/${production.id}`}
                                            className="
                                                flex items-center gap-3
                                                rounded-xl
                                                px-2 py-2
                                                transition-colors duration-200
                                                hover:bg-gray-100">
                                            <div
                                                className="
                                                    relative
                                                    w-12 h-16
                                                    shrink-0
                                                    overflow-hidden
                                                    rounded-lg
                                                    bg-gray-200">
                                                {production.poster_path && (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w200${production.poster_path}`}
                                                        alt={title || "poster"}
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover"/>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h6
                                                        className="
                                                            truncate
                                                            text-sm font-medium
                                                            text-gray-900">
                                                        {title}
                                                    </h6>

                                                    {date && (
                                                        <span
                                                            className="
                                                                shrink-0
                                                                text-xs text-gray-400">
                                                            {date.slice(0, 4)}
                                                        </span>
                                                    )}
                                                </div>

                                                <span
                                                    className="
                                                        mt-1 inline-block
                                                        text-xs text-gray-400">
                                                    {production.media_type === "movie"
                                                        ? "영화"
                                                        : "TV"}
                                                </span>
                                            </div>

                                            <span className="pr-2 text-gray-300">
                                                ›
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="px-2 py-6 text-center">
                            <p className="text-sm text-gray-400">
                                검색어를 입력하면 관련 작품이 표시됩니다.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};