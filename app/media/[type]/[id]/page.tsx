import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import DoughnutChart from "@/components/DoughnutChart";

// 영화 id로 영화 상세 정보를 불러오는 함수
async function getMovieDetail (id: number, type: string) {
    const url = `https://api.themoviedb.org/3/${type}/${id}?language=ko`;
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
async function getCredits (id: number, type: string) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?language=ko-kr`;
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
async function getVideos (id: number, type: string) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=ko-kr`;
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

export async function generateMetadata ({ params }: {params: Promise<{ id: number, type: string}> }) {
    const { id, type } = await params;
    const media = await getMovieDetail(id, type);

    return {
        title: `D.MS - ${type === "movie" ? media.title : media.name}`,
        description: media.overview,   
    }
};

export default async function MovieDetail ({
    params,
}: {
    params: Promise<{ id: number, type: string }>
}) {
    const { id, type } = await params;
    // 영화 상세 정보
    const media = await getMovieDetail(id, type);
    // 출연진 및 감독
    const credits = await getCredits(id, type);
    // 영상
    const videos = await getVideos(id, type);

    return (
        <div className="w-[95%] mx-auto">
            <div 
                className="
                    relative flex bg-cover p-20 overflow-hidden rounded-xl
                    after:content-[''] after:absolute after:inset-0
                    after:bg-black after:opacity-70"
                style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${media.backdrop_path}")`}}>
                <div className="relative m-5 z-10 w-[300px] aspect-[2/3] overflow-hidden block shrink-0">
                    <Image 
                        src={`https://image.tmdb.org/t/p/original${media.poster_path}`}
                        alt={media.title || media.name}
                        fill
                        sizes="600px"
                        className="object-cover"
                    />
                </div>

                <div className="m-5 z-10">
                    <div className="flex">
                        <h1 className="text-4xl font-bold">{type === "movie" ? media.title : media.name}</h1>
                        <span className="text-3xl ml-5 font-semibold">({type === "movie" ? media.release_date : media.first_air_date})</span>
                    </div>
                    <div className="flex items-center gap-5 text-xl relative">
                        {type === "movie" 
                            ?
                            <span className="font-semibold">상영 시간 : {media.runtime}분 {media.episode_run_time}</span>
                            :
                            <span className="font-semibold">시즌{media.number_of_seasons} (총 {media.number_of_episodes}편)</span>
                        }
                        <DoughnutChart voteAverage={media.vote_average} />
                        <p>{media.vote_count}</p>
                        <LikeButton movieId={Number(id)} mediaType={type} detail={true} />
                    </div>
                    <p className="text-lg font-light">{media.overview}</p>                  
                    <div className="my-5 text-xl">
                        {type === "movie"
                            ?
                            <span>감독 : {credits.crew.find((person: any) => person.job === "Director")?.name}</span>
                            :
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold">작가</span>
                                <div>
                                    {media.created_by.map((people: any) => (
                                        <span key={people.id} className="mr-10">
                                            {people.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        }
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