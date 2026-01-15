import { useMutation, useQueryClient } from "@tanstack/react-query";

type LikeMovie = [number, string];

type ToggleVars = {
    mediaId: number;
    isLikedBefore: boolean;
}

// 좋아요 토글 기능
export function useToggleLikeMutation ( userId: string | null, mediaType: string) {
    const queryClient = useQueryClient();
    // as const는 타입 추론을 명확하게 해준다. 
    // as const가 없다면  [string, string | null, string]이 되지만 
    // 있다면 ["likeMovies", string | null, string] 이렇게 된다.
    // 없어도 되만 타입 안정성을 위한 안전장치인 셈이다.
    const queryKey = ["likeMovies", userId, mediaType] as const;
    
    return useMutation({
        
        mutationFn: async ({mediaId, isLikedBefore}: ToggleVars) => {
            if ( !userId ) throw new Error("LOGIN_REQUIRED");
            
            // 좋아요 취소를 위한 url
            // delete는 쿼리로 값을 받고 있다. 
            // 하지만 post는 body로 값을 받고 있기 때문에 따로 변수로 선언했다. 
            const url = `/api/likes?user_id=${userId}&movie_id=${mediaId}&media_type=${mediaType}`
            
            // 좋아요된 상태면 delete 요청
            // 아니면 post 요청
            const res = await fetch(isLikedBefore ? url : "/api/likes", {
                method: isLikedBefore ? "DELETE" : "POST",
                headers: isLikedBefore ? undefined : { "Content-Type": "application/json"},
                // body에는 post일 때 만 값이 들어가기 때문에 
                // delete는 undefined로 보낸다. 
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
        // 낙관적 업데이트.
        // mutationFn 실행 전 우선 실행된다. 
        onMutate: async ({mediaId}: ToggleVars) => {
            if ( !userId ) throw new Error("LOGIN_REQUIRED");
            // refeth 중인 데이터 요청을 취소한다. 
            // 만일 likeMovies가 백그라운드에서 실행 중일 때 
            // 이 낙관적 업데이트와 충돌 가능성이 있기 때문이다. 
            await queryClient.cancelQueries({ queryKey });

            // refetch 요청을 취소하고 기존에 있던 가장 최신의 캐싱된 값을 저장한다.
            const prev = queryClient.getQueryData<LikeMovie[]>(queryKey) ?? [];
            // 캐싱된 값 중 mediaId와 mediaType과 동일한 값이 있으면 true, 없다면 false 반환.
            const isLiked = prev.some(([id, type]) => id === mediaId && type === mediaType);
        
            // 좋아요 요청 혹은 취소 관리
            queryClient.setQueryData<LikeMovie[]>(queryKey, (old = []) => {
                if ( isLiked ) {
                    return old.filter(([id, type]) => !(id === mediaId && type === mediaType));
                }
                return [...old, [mediaId, mediaType]];
            });

            // 실패했을 경우를 대비해 백업 데이터를 반환
            return { prev };
        },

        // 두 번째 인자 _mediaId는 mutationFn에서 받은 매개변수 전체가 들어와 있다.
        onError: (err, _mediaId, context) => {
            // onMutate에서 실패를 대비해 반환했던 이전 개시값이 있을 경우 
            if ( context?.prev ) {
                queryClient.setQueryData(queryKey, context.prev);
            };

            if (( err as Error ).message === "LOGIN_REQUIRED") {
                alert("로그인 후 이용할 수 있습니다.");
                return;
            };

        },
        
        // onSettled: () => {
        //     queryClient.invalidateQueries({ queryKey });
        // },
    });
};