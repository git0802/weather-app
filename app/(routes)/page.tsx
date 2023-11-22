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

export default function Home() {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isCityClicked, setIsCityClicked] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const onClickCity = (lat: number, lon: number) => {
    setIsCityClicked(true);
    setProgress(progress + 50);
    navigator.geolocation.getCurrentPosition(async function () {
        const forecastUrl = 'forecast.json';
        try {
          const res = await axios.get(`//api.weatherapi.com/v1/${forecastUrl}?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${lat + ',' + lon}&days=7`);
          setWeatherData(res.data);
          setProgress(100);
        }
         catch (error) {
          console.log('Error Fetching data:', error);
        }
      }, function (error) {
        console.error("Error getting location:", error.message);
      });  
  }

  useEffect(() => {
    if(!isCityClicked){
      navigator.geolocation.getCurrentPosition(async function (position) {
        const forecastUrl = 'forecast.json';
        try {
          const res = await axios.get(`//api.weatherapi.com/v1/${forecastUrl}?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${position.coords.latitude + ',' + position.coords.longitude}&days=7`);
          setWeatherData(res.data);
        }
        catch (error) {
          console.log('Error Fetching data:', error);
        }
      }, function (error) {
        console.error("Error getting location:", error.message);
      });  
    }
  },[]);
  
  return (
    <Container>
      <LoadingBar
        color='#FFFFFF'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex flex-col py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-4 w-full">
          <div className="lg:col-span-8">
              <SearchPanel onClick={onClickCity} isClicked={isCityClicked} setisClicked={setIsCityClicked} />
              <HourlyForecast data={weatherData} />
          </div>
          <div className="lg:col-span-4">
            <InfoOverview data={weatherData} onClick={onClickCity} isClicked={isCityClicked} setisClicked={setIsCityClicked} />
          </div>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-4 w-full">
          <div className="lg:col-span-8">
            <Condition data={weatherData} />
          </div>
          <div className="lg:col-span-4">
            <DayForecast data={weatherData} />
          </div>
        </div>
      </div>
    </Container>
  )
}
