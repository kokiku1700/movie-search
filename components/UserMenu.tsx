import Link from "next/link";

export default function UserMenu () {

    return (
        <div className="w-full flex justify-center">
            <Link href={"/login"} className="mx-2 px-2 whitespace-nowrap">로그인</Link>
            <Link href={"/signUp"} className="mx-2 px-2 whitespace-nowrap">회원가입</Link>
        </div>
    )
}