export type Media = {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    release_date: string;
    media_type: string;
    total_page?: number;
};

interface SearchResponse {
    page: number;
    results: Media[];
    total_pages: number;
    total_results: number; 
}

export async function getMovies ( query: string, page: number ): Promise<SearchResponse> {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=ko-kr&page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    });

    return res.json();
}