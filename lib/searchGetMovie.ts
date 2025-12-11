export interface Media {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    release_date: string;
    media_type: string;
};

interface SearchMovie {
    results: Media[];
}

export async function getMovies ( query: string ): Promise<Media[]> {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=ko-kr&page=1`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    });

    const data: SearchMovie = await res.json();

    return data.results;
}