import Slide from "@/components/Slide";
import Header from "@/components/Header";

export default async function Home() {
  
  return (
    <>
      <Header />
      <Slide url="trending/all/day?language=ko-KR" subject="실시간 인기 작품" />
      <Slide url="/popular?language=ko&page=1" subject="현재 인기 영화" mediaType="movie" />
      <Slide url="/top_rated?language=ko&page=1" subject="역대 인기 영화" mediaType="movie" />
    </>
  );
}
