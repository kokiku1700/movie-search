import { useQuery } from "@tanstack/react-query";

// 좋아요 목록을 가져온다.
// 우선적으로 queryKey로 캐싱된 값이 있는지 확인한다.
// 값이 fresh하면 바로 데이터를 반환하고 없거나 fresh하지 않다면 
// queryFn을 실행한다. 
// queryFn을 실행하고 반환값은 호출 변수와 캐시에 저장된다. 
export function useLikeMoviesQuery(userId: string | null, mediaType: string) {
    return useQuery({
        // 해당 쿼리키로 캐시를 조회한다. 
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
        },
        // 인자로 받은 아이디가 없다면 함수는 실행되지 않는다.
        // 즉, 로그인 상태가 아니라면 좋아요 목록을 가져오지 않는다. 
        enabled: !!userId
    });
};