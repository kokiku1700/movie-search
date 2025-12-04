import { useQuery } from "@tanstack/react-query";

export function useLikeMoviesQuery(userId: string | null) {
    return useQuery({
        queryKey: ["likeMovies", userId],
        queryFn: async () => {
            const res = await fetch('/api/likes', {
                method: "POST",
                body: JSON.stringify({
                    action: "getLikeMovies",
                    user: { user_id: userId},
                }),
            });
            const data = await res.json();

            return data.likes ?? [];
        }
    });
};