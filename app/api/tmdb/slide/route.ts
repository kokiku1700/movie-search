
export async function GET ( req: Request ) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const mediaType = searchParams.get("mediaType");

    const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${url}`,
        {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
            }
        }
    );

    return Response.json(await res.json());
};