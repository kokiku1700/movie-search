import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

interface Movie {
    id: number;
    title: string;
    backdrop_path: string | null;
    poster_path: string | null;
    overview: string;
    release_date: string;
};

interface SearchMovie {
    results: Movie[];
}

interface MovieListProps {
    searchParams: Promise<{q: string}>;
}

async function getMovies ( query: string ): Promise<Movie[]> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    };

    const res = await fetch(url, options);

    const data: SearchMovie = await res.json();

    return data.results;
}

export default async function MovieList (props: MovieListProps) {
    const { q } = await props.searchParams;
    const query = encodeURIComponent(q);

    const movies: Movie[] = await getMovies(query);

    return (
        <>
            <Header />
            <div className="w-[90%] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {movies.map(m => (
                    <div key={m.id} className="w-full overflow-hidden">
                        <h3 className="text-center whitespace-nowrap">{m.title}</h3>
                        <div className="relative aspect-[2/3]">
                            <Link href={`/movie/${m.id}`}>
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} 
                                    alt={m.title}
                                    fill
                                    className="object-cover"
                                />
                            </Link>
                            
                        </div>
                    </div>
                ))}
            </div>
            
        </>
    )
}