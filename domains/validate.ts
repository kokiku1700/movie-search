
export type InputField = "name" | "id" | "password";

export const validation: Record<
    InputField, 
    {
        regex: RegExp;
        guide: string;
        error: string;
    }
> = {
    name: {
        regex: /^[가-힣]{2,12}$/,
        guide: "2~12자 한글",
        error: "2~12자의 한글만 가능합니다."
    },
    id: {
        regex:  /^[a-z0-9]{6,16}$/,
        guide: "6~16자 영문 및 숫자",
        error: "6~16자의 영문 및 숫자만 가능합니다."
    },
    password: {
        regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/,
        guide: "8~16자 소문자, 대문자, 숫자, 특수기호를 최소 한 개 이상 사용",
        error: "8~16자 소문자, 대문자, 숫자, 특수기호를 최소 한 개 이상 사용해주세요."
    },
}