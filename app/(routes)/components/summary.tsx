"use client";

import { WeatherData } from "@/types";
import React, { useState, useEffect } from "react";
import {
  Button,
  Spinner,
  Checkbox,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import axios from "axios";
import { Progress } from "@material-tailwind/react";

interface SummaryProps {
  data: WeatherData | null;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const [picture, setPicture] = useState(false);
  const [audio, setAudio] = useState(false);

  const [summaryData, setSummaryData] = useState('');
  const [summaryImage, setSummaryImage] = useState('');
  const [summaryAudio, setSummaryAudio] = useState('');

  const address = data?.location.name;
  const dailyForecasts = data?.forecast.forecastday;
  const lat = data?.location.lat;
  const lon = data?.location.lon;

  const [loadingStatus, setLoadingStatus] = useState(true);  
  const [loadingProgress, setLoadingProgress]=  useState(0);

  const generateSummary = (summaryType: any) => {
    navigator.geolocation.getCurrentPosition(
      async function () {
        
        setSummaryData('');
        setSummaryImage('');
        setSummaryAudio('');
        setLoadingProgress(0); 
        
        const interval = setInterval(() => {
          setLoadingProgress((oldProgress) => {
            if (oldProgress >= 75) {  // Changed to 75 for better progress distribution
              clearInterval(interval);
              return oldProgress;
            }
            const newProgress = oldProgress + 1;
            return newProgress;
          });
        }, 500);

        try {
          setLoadingStatus(false);
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/generateSummary`, {
              dailyForecasts,
              lat,
              lon,
              address,
              picture,
              audio,
              summaryType
            }
          );
          clearInterval(interval);

          const interval2 = setInterval(() => {
            setLoadingProgress((oldProgress) => {
              if (oldProgress >= 100) {
                clearInterval(interval2);
                return oldProgress;
              }
              const newProgress = oldProgress + 1;
              return newProgress;
            });
          }, 125);

          setTimeout(() => {
            clearInterval(interval2);
            setLoadingProgress(100);
            setLoadingStatus(true);
            setSummaryData(res.data.summary);
            setSummaryImage(res.data.imageUrl);
            setSummaryAudio(res.data.audioBase64);
          }, 10000);
          
        } catch (error) {
          clearInterval(interval);
          setLoadingStatus(true);
          console.log("Error Fetching Summary Data: ", error);
        }
      },
      function (error) {
        console.error("Error getting Summary Data: ", error.message);        
      }
    );
  };  

  useEffect(() => {
    setSummaryData('');
    setSummaryImage('');
    setSummaryAudio('');
  }, [data]);

  return (
    <div className={`mt-4 bg-[#202b3c] rounded-xl max-h-[560px] overflow-auto`}>
      <div className="p-5 flex justify-center flex-col gap-3">
        <div className="flex gap-3 justify-center">
          <Button
            className="rounded-full w-5/12 flex items-center justify-center"
            size="md"
            color="blue"
            onClick={() => generateSummary("creative")}
            disabled={!loadingStatus}
          >
            {loadingStatus ? (
              <Typography className="font-semibold text-xs">
                Creative
              </Typography>
            ) : (
              <Spinner color="red" />
            )}
          </Button>
          <Button
            className="rounded-full w-5/12 flex items-center justify-center"
            size="md"
            color="amber"
            onClick={() => generateSummary("pro")}
            disabled={!loadingStatus}
          >
            {loadingStatus ? (
              <Typography className="font-semibold text-xs">
                Professional
              </Typography>
            ) : (
              <Spinner color="red" />
            )}
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center gap-3">
            <label
              htmlFor="picture"
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id="picture"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                  crossOrigin={undefined}
                  color="red"
                  checked={picture}
                  onChange={(event) => setPicture(event.target.checked)}
                />
              </ListItemPrefix>
              <Typography className="text-sm text-white">
                Generate Picture
              </Typography>
            </label>
            <label
              htmlFor="audio"
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id="audio"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                  crossOrigin={undefined}
                  color="red"
                  checked={audio}
                  onChange={(event) => setAudio(event.target.checked)}
                />
              </ListItemPrefix>
              <Typography className="text-sm text-white">
                Generate Audio
              </Typography>
            </label>
          </div>
        </div>
        <div>
          {summaryData ? (
            <div className="border p-3 rounded-xl">
              <Typography color="white">{summaryData}</Typography>
            </div>
          ) : (
            <div className="border w-full flex flex-col space-x-3 justify-center items-center rounded-xl h-[370px]">              
              <Image alt="sun" src="/images/sun.svg" width={100} height={100} />
              <div className={loadingStatus ? 'invisible' : 'w-1/2'}>
                <Progress value={loadingProgress} color="amber" />
              </div>
            </div>
          )}
        </div>
        {
          summaryImage && (
            <div className="w-full flex justify-center items-center h-[370px]">
              <img alt="sun" src={summaryImage} className="w-full rounded-xl" />
            </div>
          )
        }
        {
          summaryAudio && (
            <div className="w-full">
              <audio id="song" className="block w-full max-w-md mx-auto" controls>
                <source
                  src={`data:audio/mpeg;base64,${summaryAudio}`}
                  type="audio/mpeg"
                />
              </audio>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Summary;
