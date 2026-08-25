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
    const [storageId, setStorageId] = useState<string | null>(null);

    const { data: likeMovies } = useLikeMoviesQuery(storageId, mediaType);
    const { mutate: toggleLike, isPending } = useToggleLikeMutation(storageId, mediaType);
    // 여기서 보이는 isLiked는 좋아요 목록 중 해당 작품의 id와 type이  
    // 존재하기만 하면 true로 반환
    const isLiked = likeMovies?.some(([id, type]:[number, string]) => Number(id) === movieId && type === mediaType) ?? false;
    
    useEffect(() => {
        const id = localStorage.getItem("id");
        
        setStorageId(id);
    }, []);

    const onClick = () => {
        // isPending이 false면 완료 
        // true면 데이터를 불러오는 중
        if ( isPending ) return;

        toggleLike({mediaId: movieId, isLikedBefore: isLiked});
    };

    return (
        <button
            onClick={onClick}
            disabled={isPending}
            aria-label={isLiked ? "좋아요 취소" : "좋아요 추가"}
            className={
                    detail ? 
                    "cursor-pointer z-100" : 
                    `w-10 h-10 
                    absolute bottom-[3%] right-[3%] 
                    cursor-pointer z-100
                    lg:w-13 lg:h-13`}>
            <Image 
                src={isLiked ? heart : emptyHeart} 
                alt={isLiked ? "heart" : "emptyHeart"}/> 
        </button>
    );
};