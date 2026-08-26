import Slide from "@/components/Slide";
import Header from "@/components/Header";
import RealTimePopular from "@/components/RealTimePopular";

export default async function Home() {
  
  	return (
		<>
			<Header />
			<RealTimePopular />
			<Slide 
				url="/popular?language=ko&page=1" 
				subject="현재 인기 영화" 
				mediaType="movie" 
				lanked={false}/>
			<Slide 
				url="/top_rated?language=ko&page=1" 
				subject="최고 평점 영화" 
				mediaType="movie" 
				lanked={true}/>
		</>
	);
};
