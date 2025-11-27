import sql from "@/lib/sql";

export async function POST ( req: Request ) {
    const body = await req.json();
    const { user_id, movie_id } = body;

    // on confilict do nothing
    // 이미 데이터베이스에 값이 있다면 무시한다.
    await sql`
        insert into likes (user_id, movie_id)
        values(${user_id}, ${movie_id})
        on conflict do nothing;
    `;
};

export async function DELETE ( req: Request ) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const movie_id = searchParams.get("movie_id");

    await sql`
        delete from likes
        where user_id = ${user_id} and movie_id = ${Number(movie_id)};
    `;
}