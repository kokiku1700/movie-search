import { getNowPlayingMovie } from "@/lib/tmdb/getNowPlayingMovie";
import NowPlayingMovieList from "./NowPlayingMovieList";


export default async function NowPlayingMovieSection () {
    const nowPlayingMovies = await getNowPlayingMovie();

    return (
        <section className="w-full px-6 pt-7 pb-14">
            <NowPlayingMovieList nowPlayingMovies={nowPlayingMovies}/>
        </section>
    );
}