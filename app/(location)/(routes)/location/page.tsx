"use client"

import pin from "@/public/images/pin.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Location = () => {
    const router = useRouter();
    const am = [1,2,3,4,5,6,7,8,9,10,11,12];
    const currentStatus = Number(new Date().getHours().toFixed());

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
              console.log("Latitude is:", position.coords.latitude);
              console.log("Longitude is:", position.coords.longitude);
              router.push('/');
            }, function(error) {
              console.error("Error getting location:", error.message);
              router.push('/location');
            });
        }else {
            console.error("Geolocation is not available in this browser.");
            router.push('/location');
        }
    },[router]);

    return(
        <div className="flex flex-col items-center gap-5 p-4">
            <div className="relative overflow-hidden">
                <Image className="h-36 w-36" alt="" src={pin}/>
            </div>
            <h1 className={`${am.includes(currentStatus)? 'text-black' : 'text-white'} font-bold`}>Allow your location</h1>
            <p className="italic text-gray-500 text-center">We couldn&apos;t access your geolocation. Please allow location access and try again.</p>
        </div>
    )
}

export default Location;