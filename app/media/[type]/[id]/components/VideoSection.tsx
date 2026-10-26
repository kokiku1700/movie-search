"use client";

type Video = {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
};

type Props = {
    videos: Video[];
}

export default function VideoSection ({ videos }: Props) {

    return (
        <div className="my-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold">
                    동영상
                </h2>
                <span className="text-sm text-gray-400">
                    TRAILERS & VIDEOS
                </span>
            </div>

            {videos.length > 0 && (
                <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {videos.map((video: any) => (
                            <div
                                key={video.id}
                                className="aspect-video overflow-hidden rounded-xl bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    className="w-full h-full"
                                    loading="lazy"
                                    allowFullScreen/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};