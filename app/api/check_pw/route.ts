import sql from "@/lib/sql";

export async function POST ( req: Request ) {
    const { id } = await req.json();

    const result = await sql`
        select user_password 
        from users
        where user_id=${id};
    `;

    return Response.json(result[0]);
};