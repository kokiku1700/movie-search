import { getMovies, Media } from "@/lib/searchGetMovie";
import SearchList from "@/components/SearchList";
import Pagination from "@/components/Pagination";

interface MovieListProps {
    searchParams: Promise<{q: string; page: number}>;
}

export default async function MovieList (props: MovieListProps) {
    const { q, page } = await props.searchParams;
    // 입력 값을 인코딩해준다. 
    const query = encodeURIComponent(q);
    // 기존 getMovies는 results만 반환해서 작품 리스트만 얻을 수 있었다.
    // 하지만 내부 코드를 수정하면서 현재 페이지의 넘버와 함께 넘기고 
    // 반환값 전체를 얻는다.
    const data = await getMovies(query, Number(page));

    // 작품 목록
    const medias = data.results;
    // 키워드로 검색한 결과의 총 페이지
    const totalPages = data.total_pages;

    return (
        <>
            <SearchList medias={medias} />
            <Pagination currentPage={Number(page)} totalPage={totalPages} />
        </>
    )
}