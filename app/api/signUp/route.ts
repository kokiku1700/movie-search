import postgres from "postgres";

const sql = postgres({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PW,
});



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
        return Response.json({ success: false, message: "회원가입 실패"})
    }
    
}