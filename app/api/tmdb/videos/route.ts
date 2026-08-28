export async function GET ( req: Request ) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const mediaType = searchParams.get("mediaType");

    const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=ko-kr`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    });

    return Response.json(await res.json());
};