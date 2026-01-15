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
    // 여기서 보이는 isLiked는 좋아요 목록 중 해당 작품의 id와 type이  
    // 존재하기만 하면 true로 반환
    const isLiked = likeMovies?.some(([id, type]:[number, string]) => id === movieId && type === mediaType);

    useEffect(() => {
        const id = localStorage.getItem("id");
        
        setStorageId(id);
    }, []);

    const onClick = () => {
        // isPending이 false면 완료 
        // true면 데이터를 불러오는 중
        if ( isPending ) return;
        // 자바스크립트에는 truthy, falsy가 존재한다. 
        // truthy인 값에 !하나만 붙이면 falsy가 되고 한 번 더 붙이면 true가 된다. 
        // 즉, !!는 다른 타입을 boolean타입으로 명시적 형변환을 해준다.
        // 굳이 !!까지 쓰지 않아도 되지만 안정성을 위해 사용했다.
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