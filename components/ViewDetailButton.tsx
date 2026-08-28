import Link from "next/link"

type Props = {
    type: string;
    id: number;
}

export default function ViewDetailButton ({ type, id }: Props) {

    return (
        <div className="mt-8">
            <Link
                href={`/media/${type}/${id}`}
                className="
                    inline-flex
                    items-center
                    rounded-lg
                    bg-white
                    px-6 py-3
                    text-sm font-semibold
                    text-zinc-900
                    transition
                    hover:bg-zinc-200">
                자세히 보기
            </Link>
        </div>
    );
};