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
  const today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
  var day = ('0' + today.getDate()).slice(-2);
  var formattedDate = year + '-' + month + '-' + day;

  return (
    <div>
      <h1
        className={`${am.includes(currentStatus) ? "text-[#c4cad3]" : "text-[#c4cad3]"
          } font-semibold text-sm`}
      >
        Weekly Forecast
      </h1>
      <div
        className={`mt-4 ${am.includes(currentStatus) ? "bg-[#202b3c]" : "bg-[#202b3c]"
          } rounded-xl flex justify-center items-center`}
      >
        <div className="px-5 py-1">
          {/* <h1
          className={`${
            am.includes(currentStatus) ? "text-[#c4cad3]" : "text-[#c4cad3]"
          } font-semibold text-sm`}
        >
          WEEKLY FORECAST
        </h1> */}
          <div className="grid grid-cols-2 xl:grid-cols-3">
            {data?.forecast.forecastday.map((day, index) => (
              day.date === formattedDate ? "" :
                (<ForecastDays key={index} value={day} />)
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayForcast;
