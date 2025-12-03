import sql from "@/lib/sql";

export async function DELETE ( req: Request ) {
    const { id } = await req.json();

    await sql`
        delete from users
        where user_id = ${id};
    `;
};