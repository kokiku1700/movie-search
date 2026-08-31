import { useQuery } from "@tanstack/react-query";

interface Movie {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    media_type: string;
};

// 여기서는 좋아요 누른 작품들의 상세 정보를 가져오는 커스텀 훅.
// 좋아요 페이지에서 내가 좋아요한 작품들을 확인하기 위해서는 각 작품의 상세 정보들이 필요한데 
// db에는 id와 type만 저장되어 있다. 
// 때문에 db에 저장된 id와 type을 이용해 tmdb에 요청해 각 작품의 상세 정보를 가져온다.
export function useLikeMoviesDetailQuery (
    // 좋아요 목록. 각 요소가 [아이디, 타입]으로 이루어진 이차원 배열
    likes: [number, string][],
    // 데이터가 도착하기 전에 쿼리에 접근하는 것을 막아준다.
    enabled: boolean
) {
    return useQuery<Movie[]>({
        // likes가 변경되면 likedMoviesDetail 그룹은 캐시를 새로 저장한다.
        // likes는 useLikeMoviesQuery에서 만든 캐시 그룹이다. 
        queryKey: ["likedMoviesDetail", likes],
        enabled: enabled && likes.length > 0,
        queryFn: async () => {
            const params = new URLSearchParams({
                likeMovies: JSON.stringify(likes),
                userIdBool: String(enabled),
            });

            const res = await fetch(`/api/likes?${params.toString()}`);

            if ( !res.ok ) {
                throw new Error("좋아요 작품을 불러오지 못했습니다.");
            };

            return res.json();
        },
    });
};