import postgres from "postgres";

const sql = postgres({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PW,
});

export async function GET ( req: Request) {
    const { searchParams } = new URL(req.url);
    const nickname = searchParams.get("nickname");
    
    if ( !nickname ) {
        return new Response(JSON.stringify({ success: false}), {status: 200})
    }

    const existing = await sql`
        select count(*) as count
        from users 
        where user_nickname=${nickname};
    `;

    return new Response(JSON.stringify({ success: existing[0].count > 0}));
};