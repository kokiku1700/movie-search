export interface Movie {
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

export async function getMovies ( query: string ): Promise<Movie[]> {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=ko&page=1`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    });

    const data: SearchMovie = await res.json();

    return data.results;
}