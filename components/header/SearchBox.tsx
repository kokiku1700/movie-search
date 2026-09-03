"use client";

import { useEffect, useRef, useState } from "react"
import SearchBar from "./SearchBar"
import SearchButton from "./SearchButton"
import { useRouter, usePathname } from "next/navigation";
import SearchDropDown from "./SearchDropDown";



export default function SearchBox () {
    const [search, setSearch] = useState("");
    const [isFocused, setIsFoused] = useState(false);
    const searchBoxRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();

    const saveRecentSearch = ( search: string ) => {
        const words: string[] = JSON.parse(localStorage.getItem("word") ?? "[]");
    
        const newWords = [
            search, ...words.filter(word => word !== search)
        ].slice(0, 10);

        localStorage.setItem("word", JSON.stringify(newWords));
    };

    const handlerSearch = (word?: string) => {
        const query = word ?? search
        if ( query.trim() !== "" ) {
            // 기존 코드에서는 &page=1은 없었지만
            // 페이지네이션을 적용하면서 추가했다.
            // 새로 검색하면 첫 페이지를 렌더링해준다.
            if ( pathname === "/list") router.replace(`/list?q=${query}&page=1`, undefined);
            else router.push(`/list?q=${query}&page=1`);
        };
        setIsFoused(false);
        saveRecentSearch(search);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if ( searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)){
                setIsFoused(false);
            };
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        setIsFoused(true);
    };

    return (
        <div 
            ref={searchBoxRef}
            className="
                relative 
                flex justify-center items-center 
                w-full
                sm:w-[90%]">
            <SearchBar 
                search={search} setSearch={setSearch} 
                onEnter={handlerSearch} 
                onFocus={handleFocus}/>
            <SearchButton onClick={handlerSearch} />
            {isFocused && <SearchDropDown handlerSearch={handlerSearch} search={search} setSearch={setSearch} />}
        </div>
    )
}