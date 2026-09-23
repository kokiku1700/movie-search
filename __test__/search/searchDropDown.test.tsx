import { render, screen } from "@testing-library/react";
import userEvent from"@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchDropDown from "../../components/header/SearchDropDown";

describe("SearchDropDown", () => {
    beforeEach(() => {
        localStorage.clear();

        global.fetch = vi.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            } as Response)
        );
    });
    
    it("최근 검색어 목록을 화면에 표시한다.", () => {
        localStorage.setItem(
            "word",
            JSON.stringify(["안녕", "배트맨"])
        );

        render(
            <SearchDropDown 
                handlerSearch={vi.fn()}
                search=""
                setSearch={vi.fn()}/>
        );

        expect(screen.getByText("안녕")).toBeInTheDocument();
        expect(screen.getByText("배트맨")).toBeInTheDocument();
    });

    it("최근 검색어 삭제 버튼 클릭 시 해당 검색어가 목록에서 제거된다.", async () => {
        const user = userEvent.setup();

        localStorage.setItem(
            "word",
            JSON.stringify(["어벤저스", "아이언맨"])
        );

        render(<SearchDropDown 
                handlerSearch={vi.fn()}
                search=""
                setSearch={vi.fn()} />)

        expect(screen.getByText("어벤저스")).toBeInTheDocument();
        expect(screen.getByText("아이언맨")).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", { name: "어벤저스 삭제" })
        );

        expect(screen.queryByText("어벤저스")).not.toBeInTheDocument();
        expect(screen.getByText("아이언맨")).toBeInTheDocument();
    });

    it("최근 검색어 삭제 시 localStorage에서도 제거된다.", async () => {
        const user = userEvent.setup();

        localStorage.setItem(
            "word",
            JSON.stringify(["어벤저스", "아이언맨"])
        );

        render(<SearchDropDown 
                    handlerSearch={vi.fn()}
                    search=""
                    setSearch={vi.fn()} />);
        
        await user.click(
            screen.getByRole("button", { name: "어벤저스 삭제" })
        );

        const recentWords = JSON.parse(
            localStorage.getItem("word") ?? "[]"
        );

        expect(recentWords).toEqual(["아이언맨"]);
    });

    beforeEach(() => {
        localStorage.clear();
    });
});