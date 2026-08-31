import sql from "@/lib/sql";

type LikeRow = {movie_id: number, media_type: string};
type LikeMovie = [number, string];

export async function GET ( req: Request ) {
    const { searchParams } = new URL(req.url);
    
    const likeMovieParam = searchParams.get("likeMovies");
    const userIdBool = searchParams.get("userIdBool");

    if ( !userIdBool ) {
        return Response.json(
            { ok: false, message: "로그인 상태를 확인하세요."},
            { status: 401 },
        );
    };

    if ( !likeMovieParam ) {
        return Response.json(
            { ok: false, message: "좋아요 목록이 없습니다." },
            { status: 400 }
        );
    };

    const likeMovies: LikeMovie[] = JSON.parse(likeMovieParam);
    const moviePromises = likeMovies.map(async ([id, mediaType]) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}?language=ko-KR`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                },
            }
        );

        if ( !res.ok ) {
            throw new Error(`TMDB 요청 실패: ${res.status}`);
        };

        const movie = await res.json();

        return {
            ...movie,
            media_type: mediaType,
        };
    });

    const movies = await Promise.all(moviePromises);

    return Response.json(movies);
};

export async function POST ( req: Request ) {
    const body = await req.json();
    const user_id = body.user.user_id;
    const movie_id = body.user.movie_id;
    const media_type = body.user.media_type;

    switch ( body.action ) {
        // 데이터베이스에서 좋아요 누른 영화 목록을 불러온다.
        case "getLikeMovies":
            const result = await sql`
                select movie_id, media_type
                from likes
                where user_id = ${user_id};
            `;
            // result = 배열안 객체로 반환한다.
            // 예를 들면 [{movie_id: 1}, {movie_id: 2} ...] 이런 식으로
            // 타입을 지정해줘야 되는데 일반적인 방법으로 안돼서 
            // result 타입을 unknown으로 변환 후 타입을 지정했다.
            const likes = ((result as unknown) as LikeRow[]).map(e => [e.movie_id, e.media_type]);
            return new Response(JSON.stringify({ likes }));
        
        // 좋아요를 누르면 데이터베이스에 아이디와 작품 아이디, 작품 타입을 저장한다.
        case "postLikeMovies":
            // on confilict do nothing
            // 이미 데이터베이스에 값이 있다면 무시한다.
            await sql`
                insert into likes (user_id, movie_id, media_type)
                values(${user_id}, ${movie_id}, ${media_type})
                on conflict do nothing;
            `;
            return new Response(JSON.stringify({ success: true }));
    };
};

// 좋아요를 취소한다.
export async function DELETE ( req: Request ) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const movie_id = searchParams.get("movie_id");
    const media_type = searchParams.get("media_type");
    await sql`
        delete from likes
        where user_id = ${user_id} 
        and movie_id = ${Number(movie_id)} 
        and media_type = ${media_type};
    `;

    return new Response(JSON.stringify({ success: true }))
};