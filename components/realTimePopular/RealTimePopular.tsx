import { getRealTimePopular } from "@/lib/tmdb/getRealTimePopular";
import BackDropSlide from "./BackDropSlide";


export default async function RealTimePopular () {
    const data = await getRealTimePopular();
    
    
    return (
        <section 
            className="w-full h-[80vh]">
            <BackDropSlide data={data} />
        </section>
    );
};