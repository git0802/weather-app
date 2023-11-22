"use client"

import SplashScreen from "@/components/splash-screen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WeatherPageLayout({children}:{
    children: React.ReactNode
}){

    const[loading, setLoading] = useState(false);
    const am = [1,2,3,4,5,6,7,8,9,10,11,12];
    const currentStatus = Number(new Date().getHours().toFixed());
    const router = useRouter();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function() {
            }, function(error) {
              console.error("Error getting location:", error.message);
              router.push('/location');
            });
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        },3000);
    }else {
        console.error("Geolocation is not available in this browser.");
        router.push('/location');
      }
    },[router]);

    return(
        <div className={`h-full transition-colors duration-1000`}>
            {loading? <SplashScreen /> : <div className="h-full animate-fadeIn flex justify-center">{children}</div>}
        </div>
    )
}