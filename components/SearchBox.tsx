"use client"

import { useState } from "react"
import SearchBar from "./SearchBar"
import SearchButton from "./SearchButton"

export default function SearchBox () {
    const [search, setSearch] = useState("");

    return (
        <div className="flex justify-center items-center w-[60%]">
            <SearchBar search={search} setSearch={setSearch} />
            <SearchButton keyword={search} />
        </div>
    )
}