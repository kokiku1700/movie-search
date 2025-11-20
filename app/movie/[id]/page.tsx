import Header from "@/components/Header";
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
        <>
            <Header />
            <div className="flex">
                <Image 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={500}
                    className="m-3"
                />
                <div className="m-3">
                    <h1 className="text-3xl">{movie.title}</h1>
                    <p>줄거리:{movie.overview}</p>
                    <p>출시일:{movie.release_date}</p>
                    <p>상영시간:{movie.runtime}분</p>
                    <p>{movie.genres.name}</p>
                </div>
            </div>    
        </>

    )
}