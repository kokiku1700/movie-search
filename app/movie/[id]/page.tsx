import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import DoughnutChart from "@/components/DoughnutChart";

// 영화 id로 영화 상세 정보를 불러오는 함수
async function getMovieDetail (id: number) {
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
};

// 영화 id로 출연진 및 감독 정보를 불러오는 함수
async function getCredits (id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-kr`;
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    };
    const res = await fetch(url, options);

    if ( !res.ok ) throw new Error("스태프 및 출연진을 가져올 수 없습니다.");

    return res.json();
};

// 영화 id로 영상 불러로는 함수
async function getVideos (id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-kr`;
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
    };
    const res = await fetch(url, options);

    if ( !res.ok ) throw new Error("영상을 불러올 수 없습니다.");

    return res.json();
};

export default async function MovieDetail ({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params;
    // 영화 상세 정보
    const movie = await getMovieDetail(id);
    // 출연진 및 감독
    const credits = await getCredits(id);
    // 영상
    const videos = await getVideos(id);

    return (
        <div className="w-[95%] mx-auto">
            <div 
                className="
                    relative flex bg-cover p-20 overflow-hidden rounded-xl
                    after:content-[''] after:absolute after:inset-0
                    after:bg-black after:opacity-70"
                style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`}}>
                <div className="relative m-5 z-10">
                    <Image 
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        width={500}
                        height={500}
                    />
                </div>

                <div className="m-5 z-10">
                    <div className="flex">
                        <h1 className="text-4xl font-bold">{movie.title}</h1>
                        <span className="text-3xl ml-5 font-semibold">({movie.release_date})</span>
                    </div>
                    <div className="flex items-center gap-5 text-xl relative">
                        <p className="font-semibold">상영 시간 : {movie.runtime}분</p>
                        <DoughnutChart voteAverage={movie.vote_average} />
                        <p>{movie.vote_count}</p>
                        <LikeButton movieId={Number(id)} detail={true} />
                    </div>
                    <p className="text-lg font-light">{movie.overview}</p>                  
                    <div className="my-5 text-xl">
                        <span>감독 : {credits.crew.find((person: any) => person.job === "Director")?.name}</span>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-3xl my-5">출연진</h1>
                <div className="flex gap-5">
                    {credits.cast.map((c: any) => (
                        <div key={c.id} className="w-[200px] overflow-hidden">
                            <h3 className="whitespace-nowrap truncate">{c.name}</h3>
                            <Image 
                                src={`https://image.tmdb.org/t/p/original${c.profile_path}`}
                                alt={c.name}
                                width={200}
                                height={300} />
                        </div>
                    )).slice(0, 7)}
                </div>
            </div>   
            <div>
                <h1 className="text-3xl my-5">동영상</h1>
                <div className="flex overflow-x-auto">
                    {videos.results.map((video:any) => (
                        <iframe 
                            key={video.id}
                            width="40%"
                            height="400px"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            allowFullScreen />
                    ))}
                </div>
            </div>
        </div>    
    )
}