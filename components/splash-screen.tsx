import { useEffect, useState } from "react";
import night from "@/public/images/night.gif";
import day from "@/public/images/day.gif";
import Image from "next/image";

const SplashScreen = () => {

    const [blackBg, setBlackBg] = useState(false);
    const [yellowBg, setYellowBg] = useState(false);

    useEffect(() => {
        setBlackBg(true);
        setTimeout(() => {
            setBlackBg(false);
            setYellowBg(true);
        },1500);
    },[]);

    return(
        <>
            <div className={`h-full transition-colors duration-1000 ${blackBg ? 'bg-[#0B131E]': 'bg-[#fffee0]'}`}>
                <div className="flex items-center justify-center h-full">
                    {blackBg? <div className="flex items-center justify-center flex-col animate-fadeIn">
                                <Image className="h-24 w-24" src={night} alt="" />
                                <h1 className="italic text-gray-500 font-semibold">Through night...</h1>
                              </div> : 
                              <div className="flex items-center justify-center flex-col animate-fadeIn">
                                <Image className="h-24 w-24 animate-fadeIn" src={day} alt="" />
                                <h1 className="italic text-gray-500 font-semibold">and day...</h1>
                              </div>}
                </div>
            </div>
        </>
    )
}

export default SplashScreen;