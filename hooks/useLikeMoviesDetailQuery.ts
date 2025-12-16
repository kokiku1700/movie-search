import { useQuery } from "@tanstack/react-query";

interface Movie {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    media_type: string;
};

export function useLikeMoviesDetailQuery (
    // 좋아요 목록[아이디, 타입]
    likes: [number, string][],
    // 데이터가 도착하기 전에 쿼리에 접근하는 것을 막아준다.
    enabled: boolean
) {
    return useQuery<Movie[]>({
        queryKey: ["likedMoviesDetail", likes],
        enabled: enabled && likes.length > 0,
        queryFn: async () => {
            const moviePromises = likes.map(async ([id, mediaType]) => {
                const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?language=ko`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
                    }
                });
                const movie = await res.json();

                return { ...movie, media_type: mediaType };
            });

            return Promise.all(moviePromises);
        },
    });
}