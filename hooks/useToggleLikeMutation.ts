import { useMutation, useQueryClient } from "@tanstack/react-query";

// 좋아요 토글 기능
export function useToggleLikeMutation ( userId: string | null, mediaType: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ( mediaId: number ) => {
            // getQueryData는 캐싱된 값들을 해당 키를 가져온다.
            const likeMovies: number[] = queryClient.getQueryData(["likeMovies", userId, mediaType]) || [];
            
            if ( likeMovies.includes(mediaId) ) {
                await fetch(`/api/likes?user_id=${userId}&movie_id=${mediaId}`, {
                    method: "DELETE",
                });
            } else {
                await fetch("/api/likes", {
                    method: "POST",
                    body: JSON.stringify({
                        action: "postLikeMovies",
                        user: { user_id: userId, movie_id: mediaId, media_type: mediaType},
                    }),
                });
            };
        },
        // 성공 시 기존에 캐싱되어 있는 값은 무효화하고 새롭게 업데이트한다.
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["likeMovies", userId, mediaType] });
        },
    });
};