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
            if ( pathname === "/list") router.replace(`/list?q=${search}`, undefined, {shallow: true});
            else router.push(`/list?q=${search}`);
        };
    };
    return (
        <div className="flex justify-center items-center w-[60%]">
            <SearchBar search={search} setSearch={setSearch} onEnter={handlerSearch} />
            <SearchButton onClick={handlerSearch} />
        </div>
    )
}