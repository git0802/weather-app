"use client";

import { WeatherData } from "@/types";
import React from "react";
import ForecastDays from "./forecast-day";

interface DayForcastProps {
  data: WeatherData | null;
}

const DayForcast: React.FC<DayForcastProps> = ({ data }) => {
  const am = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const currentStatus = Number(new Date().getHours().toFixed());

  return (
    <div
      className={`mt-4 ${am.includes(currentStatus) ? "bg-[#202b3c]" : "bg-[#202b3c]"
        } rounded-xl flex justify-center items-center lg:h-[500px]`}
    >
      <div className="px-5 py-1">
        {/* <h1
          className={`${
            am.includes(currentStatus) ? "text-[#c4cad3]" : "text-[#c4cad3]"
          } font-semibold text-sm`}
        >
          WEEKLY FORECAST
        </h1> */}
        <div className="grid grid-cols-3">
          {data?.forecast.forecastday.map((day, index) => (
            <ForecastDays key={index} value={day} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayForcast;
