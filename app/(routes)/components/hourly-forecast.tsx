"use client";

import { WeatherData } from "@/types";
import ForecastHours from "./forecast-hours";

interface InfoOverviewProps {
  data: WeatherData | null;
}

const HourlyForecast: React.FC<InfoOverviewProps> = ({ data }) => {
  const hour = data?.forecast.forecastday[0].hour || [];
  const indexToFind = [6, 12, 18, 24];
  const hourArray = [];
  const am = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const currentStatus = Number(new Date().getHours().toFixed());

  for (const value of indexToFind) {
    if (value >= 0 && value <= hour?.length) {
      if (value === 24) {
        hourArray.push(hour[23]);
      } else {
        hourArray.push(hour[value]);
      }
    }
  }

  return (
    <div>
      <h1
        className={`text-[#c4cad3] font-semibold text-sm`}
      >
        Today&apos;s Weather
      </h1>
      <div
        className={`lg:mt-4 w-full ${am.includes(currentStatus) ? "bg-[#202b3c]" : "bg-[#202b3c]"
          } rounded-xl mt-4`}
      >
        <div className="p-5">
          {/* <h1
          className={`${am.includes(currentStatus) ? "text-[#c4cad3]" : "text-[#c4cad3]"
            } font-semibold text-sm`}
        >
          TODAY&apos;S WEATHER
        </h1> */}
          <div className="flex flex-wrap items-center justify-center divide-x-2 divide-[#c4cad3]">
            {hourArray.map((value, index) => (
              <ForecastHours
                key={index}
                value={value}
                addRightBorder={index < 5}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
