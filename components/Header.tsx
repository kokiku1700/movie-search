import Logo from "./Logo"
import UserMenu from "./UserMenu"
import SearchBox from "./SearchBox"

export default function Header () {

    return (
        <div className="
            sticky w-full top-0 z-50 shadow-md
            flex justify-center align-center
            bg-my-gray
        ">
            <div className="flex justify-center items-center w-[20%]">
                <Logo />
            </div>
            <SearchBox />
            <div className="flex justify-center items-center w-[20%]">
                <UserMenu />
            </div>
        </div>
    )
}