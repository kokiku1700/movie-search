"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PAGE_WINDOW = 10;

export default function Pagination ({ currentPage, totalPage }: {currentPage: number, totalPage: number}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const q = searchParams.get("q");

    const startPage = Math.max(1, currentPage - PAGE_WINDOW + 1);
    const endPage = Math.min(totalPage, startPage + PAGE_WINDOW - 1);

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);

    const showLeftDots = startPage > 1;
    const showRightDots = endPage < totalPage - 1;

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