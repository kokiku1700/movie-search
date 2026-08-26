import Slide from "@/components/Slide";
import Header from "@/components/Header";
import RealTimePopular from "@/components/RealTimePopular";

export default async function Home() {
  
  return (
    <>
      <Header />
      <RealTimePopular />
      <Slide url="/popular?language=ko&page=1" subject="현재 인기 영화" mediaType="movie" />
      <Slide url="/top_rated?language=ko&page=1" subject="역대 인기 영화" mediaType="movie" />
    </>
  );
}
