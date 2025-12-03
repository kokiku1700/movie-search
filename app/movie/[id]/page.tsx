import Image from "next/image";

async function getMovieDetail (id: string) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=ko`;

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    };

    const res = await fetch(url, options);

    if ( !res.ok ) throw new Error("영화 정보를 불러올 수 없습니다.");

    return res.json();
}

export default async function MovieDetail ({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const movie = await getMovieDetail(id);

    return (
        <div className="flex w-[95%] mx-auto">
            <Image 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={500}
                className="m-5"
            />
            <div className="m-5">
                <div className="flex">
                    <h1 className="text-4xl">{movie.title}</h1>
                    <span className="text-3xl ml-5">({movie.release_date})</span>
                </div>
                <div className="flex text-xl">
                    <p>{movie.runtime}분</p>

                </div>
                <p>줄거리:{movie.overview}</p>
                
            </div>
        </div>    
    )
}