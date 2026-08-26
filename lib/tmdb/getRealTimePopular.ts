
export async function getRealTimePopular () {
    const url = `https://api.themoviedb.org/3/trending/all/day?language=ko-KR`;
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    };

    const res = await fetch(url, options);

    if ( !res.ok ) throw new Error("데이터를 불러오는데 실패했습니다.");

    const data = await res.json();
    const result = data.results
    return result;
};