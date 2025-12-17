import sql from "@/lib/sql";

export async function POST (req: Request) {
    try {
        const body = await req.json();
        const { user_nickname, user_id, user_password } = body;
        
        const result = await sql`
            INSERT INTO users (user_nickname, user_id, user_password)
            VALUES (${user_nickname}, ${user_id}, ${user_password})
            RETURNING user_nickname, user_id;
        `;

        return Response.json({
            success: true,
            user: result[0],
        })
    } catch ( error ) {
        console.error(error);
        return Response.json({ success: false, message: "입력한 정보를 다시 확인해주세요."})
    }
    
}