import { ChangeEvent } from "react"
import { Dispatch,SetStateAction } from "react";

type Props = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchBar ({search, setSearch}: Props) {

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <input 
            value={search} 
            onChange={onChangeSearch} 
            placeholder="제목을 입력해주세요."
            className="
                w-2/3
                rounded-4xl 
                text-2xl 
                leading-6
                font-normal
                p-3 pl-10 pr-17 m-5
                bg-gray-200
                focus:outline-none
            "
        />
    )
}