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
    const data = await getMovies(query, Number(page));

    const medias = data.results;
    const totalPages = data.total_pages;

    return (
        <>
            <SearchList medias={medias} />
            <Pagination currentPage={Number(page)} totalPage={totalPages} />
        </>
    )
}