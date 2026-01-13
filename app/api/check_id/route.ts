import sql from "@/lib/sql";

export async function GET ( req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if ( !id ) {
        return new Response(JSON.stringify({ success: false}), {status: 200})
    }

    const existing = await sql`
        select count(*) as count
        from users 
        where user_id=${id};
    `;

    return new Response(JSON.stringify({ success: existing[0].count > 0}));
};