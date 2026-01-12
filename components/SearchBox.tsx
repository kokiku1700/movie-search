"use client"

import { useState } from "react"
import SearchBar from "./SearchBar"
import SearchButton from "./SearchButton"
import { useRouter, usePathname } from "next/navigation";

export default function SearchBox () {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const handlerSearch = () => {
        if ( search !== "" ) {
            // 기존 코드에서는 &page=1은 없었지만
            // 페이지네이션을 적용하면서 추가했다.
            // 새로 검색하면 첫 페이지를 렌더링해준다.
            if ( pathname === "/list") router.replace(`/list?q=${search}&page=1`, undefined, {shallow: true});
            else router.push(`/list?q=${search}&page=1`);
        };
    };
    return (
        <div className="
            relative 
            flex justify-center items-center 
            w-[100%] 
            sm:w-[90%] xl:w-[70%]">
            <SearchBar search={search} setSearch={setSearch} onEnter={handlerSearch} />
            <SearchButton onClick={handlerSearch} />
        </div>
    )
}