import Input from "./Input";
import ModalButton from "./ModalButton";

type Information = {
    id: string;
    nickname: string;
    password?: string;
}

export default function ChangeModal ({ id, nickname, password }: Information) {

    const onClickCancle = () => {
        console.log('gd');
    }

    return (
        <div className="relative w-full">
            <div className="
                absolute top-[50%] left-[50%] w-[30%] 
                transform translate-x-[-50%] translate-y-[-50%]
                p-5 text-black bg-white">
                <Input type="name" value={nickname} onChange={() => {}} />
                <div className="flex justify-end">
                    <ModalButton content="취소" onClick={onClickCancle} color="red" />
                    <ModalButton content="변경" onClick={onClickCancle} />
                </div>
            </div>
        </div>
    );
}