import sql from "@/lib/sql";

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