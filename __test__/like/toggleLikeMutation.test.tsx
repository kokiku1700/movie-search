import { describe, expect, it, vi, afterEach, assertType } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useToggleLikeMutation } from "@/hooks/useToggleLikeMutation";

describe("useToggleLikeMutation", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("좋아요 추가 시 서버에 좋아요 데이터를 POST로 전달한다.", async () => {
        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockResolvedValue({ ok: true, } as Response);

        const queryClient = new QueryClient();
        
        const wrapper = ({ children }: {children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result } = renderHook(
            () => useToggleLikeMutation("test-user", "movie"),
            { wrapper }
        );

        await act(async () => {
            await result.current.mutateAsync({
                mediaId: 123,
                isLikedBefore: false,
            });
        });

        expect(fetchMock).toHaveBeenCalledWith(
            "/api/likes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "postLikeMovies",
                    user: {
                        user_id: "test-user",
                        movie_id: 123,
                        media_type: "movie",
                    },
                }),
            }
        );
    })
})