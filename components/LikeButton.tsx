"use client";

import { useLikeMoviesQuery } from "@/hooks/useLikeMoviesQuery";
import { useToggleLikeMutation } from "@/hooks/useToggleLikeMutation";
import { useEffect, useState } from "react";
import Image from "next/image";
import heart from "@/public/heart.png";
import emptyHeart from "@/public/emptyHeart.png";

type Props = {
    movieId: number;
    mediaType: string;
    detail?: boolean;
};

// 좋아요 버튼 
// detail은 메인 페이지, 좋아요, 검색 목록의 영화들과 
// 상세페이지의 차이를 두기 위해서 전달했다.
// 상세페이지는 absolute로 고정할 필요가 없기 때문이다.
export default function LikeButton ( { movieId, mediaType, detail }: Props ) {
    const [storageId, setStorageId] = useState<string | null>("");

    const { data: likeMovies } = useLikeMoviesQuery(storageId, mediaType);
    const { mutate: toggleLike, isPending } = useToggleLikeMutation(storageId, mediaType);

    const isLiked = likeMovies?.some(([id, type]:[number, string]) => id === movieId && type === mediaType);

    useEffect(() => {
        const id = localStorage.getItem("id");
        
        setStorageId(id);
    }, []);

    const onClick = () => {
        if ( isPending ) return;
        toggleLike({mediaId: movieId, isLikedBefore: !!isLiked});
    };

    return (
        <Image 
            src={isLiked ? heart : emptyHeart} 
            alt={isLiked ? "heart" : "emptyHeart"}
            onClick={onClick}
            className={
                detail ? 
                "cursor-pointer z-100" : 
                `w-10 h-10 
                absolute bottom-[3%] right-[3%] 
                cursor-pointer z-100
                lg:w-13 lg:h-13`} 
        /> 
    )
    
}