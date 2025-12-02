
type Props = {
    type: string;
    name: string;
    value: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

export default function ModalInput ({ type, name, value, onChange, placeholder }: Props) {

    return (
        <input type={type} value={value} name={name}
            onChange={onChange} placeholder={placeholder} 
            className="
                w-[80%]
                p-2
                rounded-lg border-1
            "/>
    )
}