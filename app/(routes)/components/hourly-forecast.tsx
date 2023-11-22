"use client"

import { WeatherData } from "@/types";
import ForecastHours from "./forecast-hours";

interface InfoOverviewProps {
    data: WeatherData | null;
}

const HourlyForecast: React.FC<InfoOverviewProps> = ({
    data
}) => {

    const hour = data?.forecast.forecastday[0].hour || [];
    const indexToFind = [4, 8, 12, 16, 20, 24];
    const hourArray = [];
    const am = [1,2,3,4,5,6,7,8,9,10,11,12];
    const currentStatus = Number(new Date().getHours().toFixed());


    for(const value of indexToFind){
        if(value >= 0 && value <= hour?.length){
            if(value === 24){
                hourArray.push(hour[23]);
            }else{
                hourArray.push(hour[value]);
            }
        }
    }

    return(
        <div className={`lg:mt-4 w-full ${am.includes(currentStatus)? 'bg-[#202b3c]' : 'bg-[#202b3c]'} rounded-xl`}>
            <div className="p-5">
                <h1 className={`${am.includes(currentStatus)? 'text-[#c4cad3]' : 'text-[#c4cad3]'} font-semibold text-sm`}>TODAY&apos;S FORECAST</h1>
                <div className="flex flex-wrap items-center justify-center mt-4">
                    {hourArray.map((value,index) => (
                        <ForecastHours key={index} value={value} addRightBorder={index < 5} />  
                    ))}            
                </div>
            </div>
        </div>
    )
}

export default  HourlyForecast;