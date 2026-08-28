
export async function getNowPlayingMovie () {
    const url = "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&region=KR&page=1";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    };

    const res = await fetch(url, options);

    if ( !res.ok ) {
        throw new Error("현재 상영작을 불러오는데 실패했습니다.");
    };

    const data = await res.json();
    const result = data.results;

    return result;
};

