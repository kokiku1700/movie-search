import { test, expect } from "@playwright/test";

test.describe("검색 드롭다운 E2E", () => {
    test("검색바 클릭 시 드롭다운이 표시된다.", async({ page }) => {
        await page.goto("/");

        const searchInput = page.getByPlaceholder("제목을 입력해주세요.");

        await searchInput.click();

        await expect(
            page.getByRole("heading", { name: "최근 검색어"})
        ).toBeVisible();
    });

    test("최근 검색 기록에 빈 문자열이 표시되지 않는다.", async({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem(
                "word",
                JSON.stringify(["어벤져스", "", "기생충"])
            );
        });

        await page.goto("/");

        await page.getByPlaceholder("제목을 입력해주세요.").click();

        await expect(page.getByRole(
            "button",
            { name: "어벤져스", exact: true}
        )).toBeVisible();

        await expect(page.getByRole(
            "button",
            { name: "기생충", exact: true}
        )).toBeVisible();

        const recentWords = page.locator(
            '[data-testid="recent-search-item"]'
        );

        await expect(recentWords).toHaveCount(2);
    });

    test("검색어 입력 시 관련 작품이 드롭다운에 표시된다.", async({ page }) => {
        await page.route("**/api/tmdb/search?*", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([
                    {
                        id: 299534,
                        title: "어벤져스: 엔드게임",
                        media_type: "movie",
                        poster_path: "/endgame.jpg",
                        release_date: "2019-04-24",
                    },
                    {
                        id: 299536,
                        title: "어벤져스: 인피니티 워",
                        media_type: "movie",
                        poster_path: "/infinitywar.jpg",
                        release_date: "2018-04-25",
                    },
                ]),
            });
        });

        await page.goto("/");

        const searchInput = page.getByPlaceholder("제목을 입력해주세요.");
        
        await searchInput.fill("어벤져스");

        const dropdown = page.getByTestId("search-dropdown");

        await expect(
            dropdown.getByText("어벤져스: 엔드게임", { exact: true })
        ).toBeVisible();
        await expect(
            dropdown.getByText("어벤져스: 인피니티 워", { exact: true })
        ).toBeVisible();
    });

    test("검색어 입력 후 Enter 시 검색 결과 페이지로 이동한다", async({ page }) => {
        await page.goto("/");

        const searchInput = page.getByPlaceholder("제목을 입력해주세요.");

        await searchInput.fill("어벤져스");
        await searchInput.press("Enter");

        await expect(page).toHaveURL(/\/list\?q=.*&page=1/);

        const url = new URL(page.url());

        expect(url.searchParams.get("q")).toBe("어벤져스");
        expect(url.searchParams.get("page")).toBe("1");
    });

    test("검색 결과 클릭 시 작품 상세 페이지로 이동한다", async({ page }) => {
        await page.route("**/api/tmdb/search?**", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([
                    {
                        id: 299534,
                        title: "어벤져스: 엔드게임",
                        media_type: "movie",
                        poster_path: "/endgame.jpg",
                    },
                ]),
            });
        });

        await page.goto("/");

        await page.getByPlaceholder("제목을 입력해주세요.").fill("어벤져스");

        const dropdown = page.getByTestId("search-dropdown");

        await dropdown.getByRole("link", {
            name: /어벤져스: 엔드게임/,
        }).click();

        await expect(page).toHaveURL(/299534/);
    });

    test("최근 검색어 삭제 시 UI와 localStorage에서 제거된다", async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem(
                "word",
                JSON.stringify(["어벤져스", "기생충", "인터스텔라"])
            );
        });

        await page.goto("/");

        await page.getByPlaceholder("제목을 입력해주세요.").click();

        const dropdown = page.getByTestId("search-dropdown");
        const recentWords = dropdown.getByTestId("recent-search-item");

        await expect(recentWords).toHaveCount(3);

        const target = recentWords.filter({
            has: page.getByRole("button", {
                name: "기생충",
                exact: true,
            }),
        });

        await target.getByRole("button",{
            name: "기생충 삭제",
            exact: true,
        }).click();

        await expect(
            dropdown.getByRole("button", {
                name: "기생충",
                exact: true,
            })
        ).toHaveCount(0);

        const savedwords = await page.evaluate(() => {
            return JSON.parse(
                localStorage.getItem("word") ?? "[]"
            );
        });

        expect(savedwords).toEqual([
            "어벤져스",
            "인터스텔라",
        ]);
    });
});