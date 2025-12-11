import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";

type Props = {
    id: number;
    titleAndName?: string;
    mediaType: string;
    posterPath:string;
    idx?: number;
}

export default function PosterCard ({id, titleAndName, mediaType, posterPath, idx}: Props) {

    return (
        <div className="relative overflow-hidden">
            <h2 className="overflow-hidden whitespace-nowrap text-center text-xl">{titleAndName}</h2>
            <div className="relative group">
                <span className="
                    absolute inset-0 flex items-center justify-center
                    px-2 py-1 rounded-lg bg-black/60 text-white text-md text-center
                    z-50 opacity-0 pointer-events-none
                    group-hover:opacity-100 transition-opacity
                ">
                    {titleAndName}
                </span>
                <Link 
                    href={`/media/${mediaType}/${id}`} 
                    className="
                        relative block aspect-[2/3] 
                        rounded-lg overflow-hidden">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                        alt={titleAndName || "poster"}
                        fill
                        sizes="200px"
                        className="object-cover"
                        priority={idx === 0}
                    />
                </Link>
                <LikeButton movieId={id} mediaType={mediaType} />
            </div>
        </div>
    )
};