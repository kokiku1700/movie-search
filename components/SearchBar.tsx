import { ChangeEvent, KeyboardEvent } from "react"
import { Dispatch,SetStateAction } from "react";

type Props = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    onEnter: () => void;
}

export default function SearchBar ({search, setSearch, onEnter}: Props) {

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ( e.key === "Enter" ) {
            onEnter();
        };
    };

    return (
        <input 
            value={search} 
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown}
            placeholder="제목을 입력해주세요."
            className="
                w-5/6 rounded-4xl 
                text-xl text-black
                leading-6
                font-normal
                p-2 pl-7 pr-12
                bg-gray-200
                focus:outline-none focus:ring-3
                focus:ring-sky-500
                xl:p-3 xl:pl-10 xl:text-2xl
            "
        />
    )
}