import { useMutation, useQueryClient } from "@tanstack/react-query";

type LikeMovie = [number, string];

type ToggleVars = {
    mediaId: number;
    isLikedBefore: boolean;
}

// 좋아요 토글 기능
export function useToggleLikeMutation ( userId: string | null, mediaType: string) {
    const queryClient = useQueryClient();
    const queryKey = ["likeMovies", userId, mediaType] as const;
    
    return useMutation({
        mutationFn: async ({mediaId, isLikedBefore}: ToggleVars) => {
            if ( !userId ) throw new Error("LOGIN_REQUIRED");
            
            const url = `/api/likes?user_id=${userId}&movie_id=${mediaId}&media_type=${mediaType}`
            
            const res = await fetch(isLikedBefore ? url : "/api/likes", {
                method: isLikedBefore ? "DELETE" : "POST",
                headers: isLikedBefore ? undefined : { "Content-Type": "application/json"},
                body: isLikedBefore 
                    ? undefined
                    : JSON.stringify({
                        action: "postLikeMovies",
                        user: { user_id: userId, movie_id: mediaId, media_type: mediaType},
                    }),
            });

            if ( !res.ok ) throw new Error("좋아요 요청 실패");
            
            return true;  
        },

        onMutate: async ({mediaId}: ToggleVars) => {
            await queryClient.cancelQueries({ queryKey });

            const prev = queryClient.getQueryData<LikeMovie[]>(queryKey) ?? [];
            const isLiked = prev.some(([id, type]) => id === mediaId && type === mediaType)
        
            queryClient.setQueryData<LikeMovie[]>(queryKey, (old = []) => {
                if ( isLiked ) {
                    return old.filter(([id, type]) => !(id === mediaId && type === mediaType));
                }
                return [...old, [mediaId, mediaType]];
            });

            return { prev };
        },

        onError: (err, _mediaId, context) => {
            if (( err as Error ).message === "LOGIN_REQUIRED") {
                alert("로그인 후 이용할 수 있습니다.");
                return;
            };
            if ( context?.prev ) {
                queryClient.setQueryData(queryKey, context.prev);
            };
        },
        
        // onSettled: () => {
        //     queryClient.invalidateQueries({ queryKey });
        // },
    });
};