import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LikeButton from "@/components/LikeButton";
import { useLikeMoviesQuery } from "@/hooks/useLikeMoviesQuery";
import { useToggleLikeMutation } from "@/hooks/useToggleLikeMutation";

vi.mock("@/hooks/useLikeMoviesQuery");
vi.mock("@/hooks/useToggleLikeMutation");

describe("LikeButton", () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem("id", "test-user");

        vi.clearAllMocks();
    });

    it("좋아요 추가 버튼 클릭 시 toggleLike가 실행된다.", async () => {
        // userEvent.setup()은 사용자 상호작용을 
        // 테스트하기 위한 인스턴스를 생성하는 함수
        // 예를 들어 키보드 혹은 마우스 등 입력 장치
        const user = userEvent.setup();
        const toggleLike = vi.fn();

        vi.mocked(useLikeMoviesQuery).mockReturnValue({
            data: [],
        } as any);

        vi.mocked(useToggleLikeMutation).mockReturnValue({
            mutate: toggleLike,
            isPending: false,
        } as any);

        render(
            <LikeButton
                movieId={123}
                mediaType="movie"
                detail={false} />
        );

        const likeButton = screen.getByRole("button", {
            name: "좋아요 추가",
        });
        
        await user.click(likeButton);

        // toHaveBeenCalledTimes()는 모의 함수가 정확히 지정한 횟수만큼 
        // 호출되었는 지 확인하는 매처.
        expect(toggleLike).toHaveBeenCalledTimes(1);
        // toHaveBeenCalledWith()는 모의 함수가 특정 인자와 함께 
        // 호출되었는 지 확인하는 매처.
        expect(toggleLike).toHaveBeenCalledWith({
            mediaId: 123,
            isLikedBefore: false,
        });
    });
})