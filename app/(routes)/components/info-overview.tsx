"use client";

import { City, WeatherData } from "@/types";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface InfoOverviewProps {
  data: WeatherData | null;
  onClick: (lat: number, lon: number) => void;
  isClicked: boolean;
  setisClicked: Dispatch<SetStateAction<boolean>>;
}

const InfoOverview: React.FC<InfoOverviewProps> = ({
  data,
  onClick,
  isClicked,
  setisClicked,
}) => {
  const iconUrl = "https:" + data?.current.condition.icon || "";
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const am = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const currentStatus = Number(new Date().getHours().toFixed());

  useEffect(() => {
    const fetchData = async () => {
      if (searchText) {
        const searchUrl = "search.json";

        try {
          const res = await axios.get(
            `//api.weatherapi.com/v1/${searchUrl}?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${searchText}&days=7`
          );
          setSearchResults(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setSearchResults([]);
      }
    };
    fetchData();
  }, [searchText]);

  return (
    <div className="flex flex-col gap-8 justify-center">
      <input
        className={`w-1/2 lg:hidden px-6 py-3 ${am.includes(currentStatus)
          ? "bg-[#202b3c] text-white"
          : "bg-[#202b3c] text-white"
          } text-xs rounded-xl outline-none`}
        placeholder="🔍 Search for cities..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onFocus={() => setisClicked(false)}
      />
      <div
        className={`absolute ${am.includes(currentStatus)
          ? "bg-[#202b3c] border-white"
          : "bg-[#202b3c] border-white"
          } lg:hidden lg:w-2/5 rounded-xl mt-20 border z-10 overflow-hidden ${searchResults.length === 0 ? "lg:hidden hidden" : "flex"
          } ${isClicked === true ? `lg:hidden hidden` : ""}`}
      >
        <div className="my-4 w-full">
          {searchResults.map((res) => (
            <div
              key={res.id}
              onClick={() => onClick(res.lat, res.lon)}
              className={`p-1 ${am.includes(currentStatus)
                ? "text-white hover:bg-[#0B131E]"
                : "text-white hover:bg-[#0B131E]"
                } px-4`}
            >
              {res.name + ", " + res.country}
              <span
                className={`${am.includes(currentStatus)
                  ? "text-[#c4cad3]"
                  : "text-[#c4cad3]"
                  } text-xs italic`}
              >{` Region: ${res.region}`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex lg:justify-start w-full">
        <div className="relative flex items-start justify-center h-36 w-36">
          <img
            className="h-24 w-24 object-cover object-center"
            src={iconUrl}
            alt=""
          />
        </div>
        <div className="relative flex flex-col justify-center">
          <h1
            className={`${am.includes(currentStatus) ? "text-white" : "text-white"
              } tracking-wider text-xl lg:text-4xl font-bold uppercase`}
          >
            {data?.location.name}
          </h1>
          <div className="flex flex-col text-[#c4cad3] font-bold">
            <h5>
              {data?.location.region && data?.location.region}
              {data?.location.region && ", "}
              {data?.location.country}
            </h5>
            <div className="flex flex-row gap-1 justify-start lg:justify-between">
              <h6 className="text-[10px] lg:text-sm">
                {"Latitude: "}
                {data?.location.lat}
              </h6>
              <h6 className="text-[10px] lg:text-sm">
                {"Longitude: "}
                {data?.location.lon}
              </h6>
            </div>
          </div>
          <div className="mt-2 flex gap-1 items-center justify-start lg:justify-between">
            <div className="flex flex-col gap-1">
              <h6
                className={`${am.includes(currentStatus)
                  ? "text-[#c4cad3]"
                  : "text-[#c4cad3]"
                  } text-[8px] lg:text-xs`}
              >
                Chances of rain:{" "}
                {data?.forecast.forecastday[0].day.daily_chance_of_rain}%
              </h6>
              <h6
                className={`${am.includes(currentStatus)
                  ? "text-[#c4cad3]"
                  : "text-[#c4cad3]"
                  } text-[8px] lg:text-xs`}
              >
                Chances of snow:{" "}
                {data?.forecast.forecastday[0].day.daily_chance_of_snow}%
              </h6>
            </div>
            <h1
              className={`${am.includes(currentStatus) ? "text-white" : "text-white"
                } text-4xl font-bold`}
            >
              {Math.floor(data?.current.temp_f ?? 0)}°F
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoOverview;
