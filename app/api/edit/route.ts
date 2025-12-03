import sql from "@/lib/sql";

export async function PATCH (req: Request) {
    const { id, nickname, password } = await req.json();
    
    if ( nickname ) {
        const result = await sql`
            update users
            set user_nickname=${nickname}
            where user_id=${id}
            returning *;
        `;

        return Response.json(result[0]);
    }
    if ( password ) {
        const result = await sql`
            update users
            set user_password=${password}
            where user_id=${id}
            returning *;
        `;

        return Response.json(result[0]);
    }

};