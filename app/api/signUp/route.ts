import postgres from "postgres";

const sql = postgres({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PW,
});

export async function GET () {
    const result = await sql`SELECT NOW()`;
    console.log('gd')
    return Response.json({ success: true, result});
};

export async function POST (req: Request) {
    const data = await req.json();

    
}