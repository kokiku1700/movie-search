import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link"

export default function Login () {

    return (
        <section 
            className="
                w-[40%] bg-gray-200 
                mx-auto py-20 mt-50 rounded-lg 
                flex flex-col items-center
        ">
            <Input placeholder="아이디를 입력해주세요"/>
            <Input placeholder="비밀번호를 입력해주세요"/>
            <div>
                <Link href={"signUp"}>회원가입</Link>
                <span className="mx-2 cursor-default">|</span>
                <Link href={"id_pw_Find"}>아이디 찾기</Link>
                <span className="mx-2 cursor-default">|</span>
                <Link href={"id_pw_Find"}>비밀번호 찾기</Link>
            </div>
            <Button content="로그인" />
        </section>
    )
}