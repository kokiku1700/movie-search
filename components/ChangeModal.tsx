import { useState } from "react";
import ModalButton from "./ModalButton";
import ModalInput from "./ModalInput";

type Information = {
    id: string;
    nickname: string;
    password?: string;
    onSave: (info:{id:string, nickname: string, password?: string}) => void;
}

export default function ChangeModal ({ id, nickname, password, onSave }: Information) {
    
    const [local, setLocal] = useState({
        id,
        nickname,
        password
    });

    const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocal({...local, [e.target.name]: e.target.value});
    }

    const onClickChange = async() => {
        const res = await fetch(`/api/check_nickname?nickname=${local.nickname}`);
        const data = await res.json();

        if ( data.success ) {
            console.log("존재합니다.");
        } else {
            console.log("사용 가능 합니다.");
        }
        // onSave(local);
    }

    const onClickCancle = () => {
        console.log('gd');
    }

    return (
        <div className="relative w-full">
            <div className="
                absolute top-[50%] left-[50%] w-[30%] 
                transform translate-x-[-50%] translate-y-[-50%]
                p-5 text-black bg-white">
                <ModalInput type="nickname" name="nickname" value={local.nickname} onChange={onChangeLocal} />
                <div className="flex justify-end">
                    <ModalButton content="취소" onClick={onClickCancle} color="red" />
                    <ModalButton content="변경" onClick={onClickChange} />
                </div>
            </div>
        </div>
    );
}