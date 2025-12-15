// 작품 id로 영화 상세 정보를 불러오는 함수
async function getMediaDetail (id: number, type: string) {
    const url = `https://api.themoviedb.org/3/${type}/${id}?language=ko`;
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    };
    const res = await fetch(url, options);
    
    if ( !res.ok ) throw new Error("영화 정보를 불러올 수 없습니다.");

    return res.json();
};

// 작품 id로 출연진 및 감독 정보를 불러오는 함수
async function getCredits (id: number, type: string) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?language=ko-kr`;
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    };
    const res = await fetch(url, options);

    if ( !res.ok ) throw new Error("스태프 및 출연진을 가져올 수 없습니다.");

    return res.json();
};

// 작품 id로 영상 불러로는 함수
async function getVideos (id: number, type: string) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=ko-kr`;
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    };
    const res = await fetch(url, options);

    if ( !res.ok ) throw new Error("영상을 불러올 수 없습니다.");

    return res.json();
};

// 이용자 등급을 가져오는 함수.
// movie와 tv는 사용자 등급을 가죠오는 엔드포인트가 다르다.
// 그래서 if문을 활용했다.
async function getContentRating ( id: number, type: string ) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/${type === "movie" ? "release_dates" : "content_ratings"}`
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        },
    };
    const res = await fetch(url, options);

    if ( !res.ok ) throw new Error("이용가 등급을 가져올 수 없습니다.");

    const data = await res.json();
    const result = data.results;
    const contry = result.find((e: any) => e.iso_3166_1 === "KR");
    let rating = "";

    if ( !contry ) return "";

    if ( type === "movie" ) {
        rating = contry.release_dates[0].certification;
    } else {
        rating = contry.rating;
    }
    return rating;
};

export {getMediaDetail, getCredits, getVideos, getContentRating};