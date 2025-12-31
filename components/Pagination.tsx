"use client";

import { useRouter, useSearchParams } from "next/navigation";

// 페이지네이션에서 한 번에 보여질 페이지의 최대 개수는 10개다.
const PAGE_WINDOW = 10;

export default function Pagination ({ currentPage, totalPage }: {currentPage: number, totalPage: number}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // 전달받은 여러 개의 쿼리에서 q에 해당하는 값을 추출한다.
    // 즉 검색 키워드를 얻는다.
    const q = searchParams.get("q");

    // 페이지네이션 번호 목록에서 보여질
    // 시작 페이지와 마지막 페이지의 값을 얻는다.
    const startPage = Math.max(1, currentPage - PAGE_WINDOW + 1);
    const endPage = Math.min(totalPage, startPage + PAGE_WINDOW - 1);

    // 화면에 보여질 페이지네이션 번호 목록을 만든다.(최대 10개)
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);

    // 현재 페이지 묶음 밖에 페이지가 더 있을 경우 첫 페이지와 마지막 페이지 사이에 각각 ...을 적용한다.
    const showLeftDots = startPage > 1;
    const showRightDots = endPage < totalPage - 1;

    // 번호 클릭 혹은 이전, 다음 버튼을 클릭하면 이동하는 함수
    const goToPage = (page: number) => {
        router.push(`/list?q=${q}&page=${page}`);
    };

    return (
        <div className="text-center mt-10">
            <button 
                disabled={currentPage === 1} 
                onClick={() => goToPage(currentPage - 1)}
                className={currentPage === 1 ? "cursor-default" : "cursor-pointer"}
            >
                이전
            </button>
            {showLeftDots && <span className="m-1">...</span>}
            {pages.map(page => (
                <button 
                    key={page} 
                    onClick={() => goToPage(page)}
                    disabled={currentPage === page}
                    className={`${page === currentPage ? "font-bold underline" : ""}
                        p-1 m-1 cursor-pointer
                        hover:text-sky-500
                        ${currentPage === page ? "hover:text-white" : ""}
                        ${currentPage === page ? "hover:cursor-default" : ""}`}
                >
                    {page}
                </button>
            ))}
            {showRightDots && <span className="m-1">...</span>}
            <button 
                disabled={currentPage === totalPage} 
                onClick={() => goToPage(currentPage + 1)}
                className={currentPage === totalPage ? "cursor-default" : "cursor-pointer"}
            >
                다음
            </button>
        </div>
    )
}