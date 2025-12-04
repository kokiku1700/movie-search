import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleLikeMutation ( userId: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ( movieId: number ) => {
            const likeMovies: number[] = queryClient.getQueryData(["likeMovies", userId]) || [];
            
            if ( likeMovies.includes(movieId) ) {
                await fetch(`/api/likes?user_id=${userId}&movie_id=${movieId}`, {
                    method: "DELETE",
                });
            } else {
                await fetch("/api/likes", {
                    method: "POST",
                    body: JSON.stringify({
                        action: "postLikeMovies",
                        user: { user_id: userId, movie_id: movieId},
                    }),
                });
            };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["likeMovies", userId] });
        },
    });
};