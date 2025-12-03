import { useEffect, useState } from "react";
import ModalButton from "./ModalButton";
import ModalInput from "./ModalInput";
import { useRouter } from "next/navigation";

type Information = {
    modalType: string;
    id: string;
    nickname: string;
    password?: string;
    buttonName?: string;
    onClick: () => void;
    onSave: (info:{id:string, nickname: string, password?: string}) => void;
};

export default function ChangeModal ({ modalType, id, nickname, onClick, onSave }: Information) {
    const [local, setLocal] = useState({
        id,
        nickname,
    });
    const [password, setPassword] = useState({
        now: "",
        edit: "",
        editCheck: "",
    });
    const [duplication, setDuplication] = useState(false);
    const router = useRouter();
    // props로 전달받은 값이 제대로 적용이 안돼서 만든 코드.
    // 즉 렌더링 과정에서 순서 차이때문에 값이 적용이 안됨.
    // 때문에 렌더링 후 props로 값이 들어오면 useEffect가 실행되고 
    // 값이 저장된다.
    useEffect(() => {
        setLocal({id, nickname});
    }, [id, nickname]);

    // 모달창에 입력한 값을 변경하는 함수
    const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocal({...local, [e.target.name]: e.target.value});
    };

    const onChangePW = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({...password, [e.target.name]: e.target.value});
    };

    // 입력한 닉네임 존재 여부 확인
    const onClickDuplication = async() => {
        const res = await fetch(`/api/check_nickname?nickname=${local.nickname}`);
        const data = await res.json();

        if ( data.success ) {
            setDuplication(false);
            console.log("존재합니다.");
        } else {
            setDuplication(true);
            console.log("사용 가능 합니다.");
        };
    };

    // 닉네임 혹은 비밀번호를 최종 변경하는 함수.
    const onClickEdit = async() => {
        if ( modalType === "nickname" ) {
            if ( duplication ) {
                await fetch(`api/edit`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id,
                        nickname: local.nickname,
                        password: password.editCheck,
                    })
                });
                onSave(local);
                if ( local.nickname !== "" ) localStorage.setItem("nickname", local.nickname);
                onClick();
                setDuplication(false);
            } else {
                console.log("중복된 닉네임입니다.");
            };
        } else {
            const res = await fetch('api/check_pw', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            
            if ( data.user_password !== password.now ) {
                console.log("현재 비밀번호가 다릅니다.")
            } else if ( password.edit === "" ) {
                console.log("비밀번호를 입력해주세요");
            } else if ( password.editCheck === "" ) {
                console.log("비밀번호 확인을 입력해주세요");
            } else if ( password.edit !== password.editCheck ) {
                console.log("입력한 비밀번호를 확인해주세요");
            } else {
                await fetch('api/edit', {
                    method: "PATCH",
                    headers: {"Content-Type": "applicaation/json"},
                    body: JSON.stringify({
                        id,
                        password: password.editCheck,
                    })
                });
                onClick();
                localStorage.clear();
                alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
                router.replace('/login');
            };
        };

    };

    const onClickCancle = () => {
        // 모달 상태 변경 함수
        onClick();
    };

    return (
        <div className="relative w-full">
            <div className="
                absolute top-[50%] left-[50%] w-[30%] 
                transform translate-x-[-50%] translate-y-[-50%]
                p-5 text-black bg-white">
                {modalType === "nickname" ? 
                    <div>
                        <ModalInput type="nickname" name="nickname" value={local.nickname} onChange={onChangeLocal} />
                        <ModalButton content="중복확인" onClick={onClickDuplication} />
                    </div>
                    :
                    <div>
                        <ModalInput type="password" name="now" value={password.now} onChange={onChangePW} />
                        <ModalInput type="password" name="edit" value={password.edit} onChange={onChangePW} />
                        <ModalInput type="password" name="editCheck" value={password.editCheck} onChange={onChangePW} />
                    </div>
                }

                <div className="flex justify-end">
                    <ModalButton content="취소" onClick={onClickCancle} color="red" />
                    <ModalButton content="변경" onClick={onClickEdit} />
                </div>
            </div>
        </div>
    );
};