import { useEffect, useState } from "react";
import ViewDetailButton from "../ViewDetailButton";

type Props = {
    mediaId: number;
    setMediaId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function VideoModal ({ mediaId, setMediaId }: Props) {
    const [video, setVideo] = useState(""); 

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const getVideos = async () => {
            const res = await fetch(`/api/tmdb/videos?id=${mediaId}&mediaType=movie`);
            const data = await res.json();
            const result = data.results;

            if ( !result || result.length === 0 ) {
                setVideo("");
                return;
            };

            return setVideo(result[0].key);
        };
        getVideos();
    }, []);

    return (
        <div
            className="
                z-9999
                fixed inset-0 
                flex justify-center items-center
                w-full h-full bg-black/70
                animate-modal-backdrop-in">
                <div 
                    className="
                        relative
                        w-full h-[70%]
                        mx-auto
                        animate-modal-scale-in
                        lg:w-[70%]">
                    <button 
                        type="button"
                        onClick={() => setMediaId(null)}
                        className="
                            absolute top-[-40px] right-5
                            cursor-pointer
                            lg:top-[-30px] lg:right-[-50px]">
                        [ 닫기 ]
                    </button>
                    <iframe 
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video}`}
                        allowFullScreen/>
                    <div className="w-full text-center">
                        <ViewDetailButton type="movie" id={mediaId}/>
                    </div>
                    
                </div>
        </div>
    )
}