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

// 기존 코드는 query만 받고 있었지만 페이지네이션을 적용하면서
// props에 page를 추가했다.
// 이로 인해 각 페이지네이션 번호를 클릭하거나 이동하면 
// tmdb에서 키워드와 페이지를 확인해 작품들을 가져올 수 있다.
export async function getMovies ( query: string, page: number ): Promise<SearchResponse> {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=ko-kr&page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    });

    return res.json();
}