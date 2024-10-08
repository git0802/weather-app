"use client";

import { HourlyForecast } from "@/types";
import { format, parseISO } from "date-fns";

interface ForecastHoursProps {
  value: HourlyForecast;
  addRightBorder: Boolean;
}

const ForecastHours: React.FC<ForecastHoursProps> = ({
  value,
  addRightBorder,
}) => {
  const iconUrl = "https:" + value?.condition.icon || "";
  const am = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const currentStatus = Number(new Date().getHours().toFixed());

  return (
    <div
      className={`flex flex-col p-4 justify-center items-center gap-1`}
    >
      <div className="xl:mx-3 flex flex-col justify-center items-center">
        <h1
          className={`${am.includes(currentStatus) ? "text-[#c4cad3]" : "text-[#c4cad3]"
            } text-1xl lg:text-xs font-semibold`}
        >
          {format(parseISO(value.time), "h:mm a")}
        </h1>
        <img src={iconUrl} alt="" />
        <h1
          className={`${am.includes(currentStatus) ? "text-white" : "text-white"
            } font-bold text-lg`}
        >
          {Math.floor(value.temp_f)}°F
        </h1>
      </div>
    </div>
  );
};

export default ForecastHours;
