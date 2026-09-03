import { NextResponse } from "next/server";


export async function GET ( req: Request ) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if ( !query ) {
        return NextResponse.json([]);
    };

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=ko-KR&page=1`;

    const res = await fetch(url, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
    });

    if ( !res.ok ) {
        return NextResponse.json(
            { message: "검색에 실패했습니다."},
            { status: res.status } 
        );
    };

    const data = await res.json();

    return NextResponse.json(data.results.slice(0, 10));
};