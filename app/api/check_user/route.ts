import sql from "@/lib/sql";


export async function POST ( req: Request ) {
    const { value } = await req.json();

    if ( !value ) {
        return Response.json({ message: "입력 정보가 없습니다."});
    }

    const result = await sql`
        select user_id
        from users
        where user_id = ${value}
            or user_nickname = ${value}
        limit 1;
    `;

    if ( result.length === 0 ) {
        return Response.json({ message: "일치하는 회원을 찾을 수 없습니다."});
    };

    return Response.json({id: result[0].user_id});
}