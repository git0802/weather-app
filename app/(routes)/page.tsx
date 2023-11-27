"use client";

import Container from "@/components/ui/container";
import SearchPanel from "./components/search-panel";
import InfoOverview from "./components/info-overview";
import HourlyForecast from "./components/hourly-forecast";
import axios from "axios";
import { useEffect, useState } from "react";
import { WeatherData } from "@/types";
import DayForecast from "./components/day-forecast";
import Condition from "./components/condition";
import LoadingBar from "react-top-loading-bar";
import { UnderlineTabs } from "@/app/(routes)/components/underlinetabs";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isCityClicked, setIsCityClicked] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const onClickCity = (lat: number, lon: number) => {
    setIsCityClicked(true);
    setProgress(progress + 50);
    navigator.geolocation.getCurrentPosition(
      async function () {
        const forecastUrl = "forecast.json";
        try {
          const res = await axios.get(
            `//api.weatherapi.com/v1/${forecastUrl}?key=${process.env.NEXT_PUBLIC_API_KEY
            }&q=${lat + "," + lon}&days=7`
          );
          setWeatherData(res.data);
          setProgress(100);
        } catch (error) {
          console.log("Error Fetching data:", error);
        }
      },
      function (error) {
        console.error("Error getting location:", error.message);
      }
    );
  };

  useEffect(() => {
    if (!isCityClicked) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const forecastUrl = "forecast.json";
          try {
            const res = await axios.get(
              `//api.weatherapi.com/v1/${forecastUrl}?key=${process.env.NEXT_PUBLIC_API_KEY
              }&q=${position.coords.latitude + "," + position.coords.longitude
              }&days=7`
            );
            setWeatherData(res.data);
          } catch (error) {
            console.log("Error Fetching data:", error);
          }
        },
        function (error) {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }, []);

  return (
    <Container>
      <LoadingBar
        color="#FFFFFF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex flex-col py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col justify-center lg:flex-row gap-8 w-full lg:grid lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SearchPanel
              onClick={onClickCity}
              isClicked={isCityClicked}
              setisClicked={setIsCityClicked}
            />
            <InfoOverview
              data={weatherData}
              onClick={onClickCity}
              isClicked={isCityClicked}
              setisClicked={setIsCityClicked}
            />
            <HourlyForecast data={weatherData} />
          </div>
          <div className="w-full lg:col-span-7 lg:mt-20">
            {/* <InfoOverview
              data={weatherData}
              onClick={onClickCity}
              isClicked={isCityClicked}
              setisClicked={setIsCityClicked}
            /> */}
            <UnderlineTabs tabData={weatherData} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          {/* <div className="lg:col-span-6">
            <Condition data={weatherData} />
          </div>
          <div className="lg:col-span-6">
            <div className="mt-4 py-5">
              <UnderlineTabs tabData={weatherData} />
            </div>
          </div> */}
          <Condition data={weatherData} />
        </div>
      </div>
    </Container>
  );
}
