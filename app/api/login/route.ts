import sql from "@/lib/sql";

export async function POST ( req: Request ) {
    const { id, password } = await req.json();

    const result = await sql`
        select user_nickname, user_id, user_password
        from users
        where user_id=${id} and user_password=${password}
    `;

    if ( result.length === 0 ) {
        return Response.json({ success: false, message: "아이디 또는 비밀번호가 틀렸거나 존재하지 않습니다." });
    }

    return Response.json({ success: true, user: { nickname: result[0].user_nickname, id: result[0].user_id} });
};