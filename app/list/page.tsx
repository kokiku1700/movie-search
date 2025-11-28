import Header from "@/components/Header";
import { getMovies, Movie } from "@/lib/searchGetMovie";
import SearchList from "@/components/SearchList";

interface MovieListProps {
    searchParams: Promise<{q: string}>;
}

export default async function MovieList (props: MovieListProps) {
    const { q } = await props.searchParams;
    // 입력 값을 인코딩해준다. 
    const query = encodeURIComponent(q);
    const movies: Movie[] = await getMovies(query);

    return (
        <>
            <Header />
            <SearchList movies={movies} />
        </>
    )
}