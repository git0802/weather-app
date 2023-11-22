"use client"

import { ForecastDay } from "@/types";
import { format, parseISO } from "date-fns";

interface ForecastDaysProps{
    value: ForecastDay
}

const ForecastDays: React.FC<ForecastDaysProps> = ({
    value,
}) => {

    const iconUrl = 'https:'+ value.day.condition.icon || '';
    const am = [1,2,3,4,5,6,7,8,9,10,11,12];
    const currentStatus = Number(new Date().getHours().toFixed());

    return(
        <div className="flex">
            <div className={`flex flex-col justify-center items-center border-[#314159]`}>
                <div className="my-4 lg:mr-0 flex">
                    <div className="flex flex-col justify-center items-center mr-2">
                        <h1 className={`${am.includes(currentStatus)? 'text-[#c4cad3]' : 'text-[#c4cad3]'} text-1xl lg:text-xs font-semibold`}>{format(parseISO(value.date), 'eeee')}</h1>
                        <img src={iconUrl} alt="" />
                        <h1 className={`${am.includes(currentStatus)? 'text-white' : 'text-white'} font-bold text-lg`}>{value.day.avgtemp_c}°</h1>
                    </div>
                    <div className="flex flex-col justify-center mr-2">
                        <h1 className={`${am.includes(currentStatus)? 'text-[#c4cad3]' : 'text-[#c4cad3]'} text-[9px] lg:text-xs`}>Max Temp: {value.day.maxtemp_c}</h1>
                        <h1 className={`${am.includes(currentStatus)? 'text-[#c4cad3]' : 'text-[#c4cad3]'} text-[9px] lg:text-xs`}>Min Temp: {value.day.mintemp_c}</h1>
                        <h1 className={`${am.includes(currentStatus)? 'text-[#c4cad3]' : 'text-[#c4cad3]'} text-[9px] lg:text-xs`}>Chances of rain: {value.day.daily_chance_of_rain}%</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForecastDays;