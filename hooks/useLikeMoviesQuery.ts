import { useQuery } from "@tanstack/react-query";

// 좋아요 목록을 가져온다.
export function useLikeMoviesQuery(userId: string | null, mediaType: string) {
    return useQuery({
        // queryKey는 캐싱된 값들에 접근하는 키.
        // 아래 코드를 기반으로 likeMovies 그룹에서 userId로 분류한다.
        queryKey: ["likeMovies", userId, mediaType],
        queryFn: async () => {
            const res = await fetch('/api/likes', {
                method: "POST",
                body: JSON.stringify({
                    action: "getLikeMovies",
                    user: { user_id: userId, media_type: mediaType },
                }),
            });
            const data = await res.json();

            return data.likes ?? [];
        }
    });
};