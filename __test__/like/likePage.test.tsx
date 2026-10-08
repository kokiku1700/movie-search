import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import Likes from "@/app/likes/page";
import { useLikeMoviesQuery } from "@/hooks/useLikeMoviesQuery";
import { useLikeMoviesDetailQuery } from "@/hooks/useLikeMoviesDetailQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/hooks/useLikeMoviesQuery");
vi.mock("@/hooks/useLikeMoviesDetailQuery");
vi.mock("@/components/PosterCard", () => ({
    default: ({ titleAndName }: { titleAndName: string}) => (
        <div>{titleAndName}</div>
    ),
}));

describe("좋아요 페이지", () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        localStorage.setItem("id", "test-user");

        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

        vi.mocked(useLikeMoviesQuery).mockReturnValue({
            data: [
                [123, "movie"],
            ],
            isLoading: false,
        } as ReturnType<typeof useLikeMoviesQuery>);

        vi.mocked(useLikeMoviesDetailQuery).mockReturnValue({
            data: [
                {
                    id: 123,
                    title: "테스트 영화",
                    media_type: "movie",
                    poster_path: "/test.jpg",
                },
            ],
            isLoading: false,
        } as ReturnType<typeof useLikeMoviesDetailQuery>);
    });

    it("좋아요한 영화가 화면에 표시된다", async () => {
        render
            (<QueryClientProvider client={queryClient}>
                <Likes />
            </QueryClientProvider>
        );

        expect(await screen.findByText("테스트 영화")).toBeInTheDocument();
    });

    afterEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });
});