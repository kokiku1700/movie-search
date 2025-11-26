import postgres from "postgres";

const sql = postgres({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PW,
});

export async function POST ( req: Request ) {
    const { id, password } = await req.json();

    const result = await sql`
        select user_nickname, user_id, user_password
        from users
        where user_id=${id} and user_password=${password}
    `;

    if ( result.length === 0 ) {
        return Response.json({ success: false, message: "아이디 및 비밀번호가 틀렸거나 존재하지 않습니다." });
    }

    return Response.json({ success: true, user: { nickname: result[0].user_nickname, id: result[0].user_id} });
};