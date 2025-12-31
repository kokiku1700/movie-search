"use client";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import SearchBox from "./SearchBox";
import menu from "@/public/menu.png";
import Image from "next/image";
import { useState } from "react";

export default function Header () {
    const [menuState, setMenuState] = useState(false);

    const menuToggle = () => {
        setMenuState(!menuState);
    };

    return (
        <header className="
            sticky w-full top-0 z-9999 shadow-md
            bg-my-gray pb-2 px-3
            lg:py-2"
        >
            <div className="
                grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto]
                items-center gap-y-2
                p-1
                lg:grid-rows-1">
                <div className="row-start-1 col-start-1">
                    <Logo />
                </div>
                <div className="
                    row-start-2 col-span-3 
                    flex justify-center
                    lg:row-start-1 lg:col-start-2 lg:col-span-1">
                    <SearchBox />
                </div>
                <div 
                    onClick={menuToggle}
                    className="
                        relative 
                        row-start-1 col-start-3  
                        w-10 sm:w-13 h-10 sm:h-12
                        px-5">
                    <Image src={menu} alt="menu" fill />
                    {menuState && <UserMenu />}
                </div>
            </div>
        </header>
    )
}