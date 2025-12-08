"use client";

import { useLikeMoviesQuery } from "@/hooks/useLikeMoviesQuery";
import { useToggleLikeMutation } from "@/hooks/useToggleLikeMutation";
import { useEffect, useState } from "react";
import Image from "next/image";
import heart from "@/public/heart.png";
import emptyHeart from "@/public/emptyHeart.png";

type Props = {
    movieId: number;
    detail?: boolean;
};

// 좋아요 버튼 
export default function LikeButton ( { movieId, detail }: Props ) {
    const [storageId, setStorageId] = useState<string | null>("");

    const { data: likeMovies } = useLikeMoviesQuery(storageId);
    const { mutate: toggleLike } = useToggleLikeMutation(storageId);

    const isLiked = likeMovies?.includes(movieId);

    useEffect(() => {
        const id = localStorage.getItem("id");
        
        setStorageId(id);
    }, []);

    return (
        <div>
            <Image 
                src={isLiked ? heart : emptyHeart} 
                alt={isLiked ? "heart" : "emptyHeart"}
                onClick={() => toggleLike(movieId)}
                className={detail ? "cursor-pointer" : "absolute bottom-[1%] right-[1%] cursor-pointer"} 
            /> 
        </div>

    )
    
}