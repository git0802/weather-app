"use client";

import { WeatherData } from "@/types";
import React, { useState, useEffect } from "react";
import {
  Button,
  Spinner,
  Checkbox,
  ListItemPrefix,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Exclamation, XCircleOutline } from "heroicons-react";
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

  const [dailyForecasts, setDailyForecasts] = useState({});

  const address = data?.location.name;
  // const dailyForecasts = data?.forecast.forecastday;
  const lat = data?.location.lat;
  const lon = data?.location.lon;

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [statusError, setStatusError] = useState(false)
  const [buttonType, setButtonType] = useState("");

  async function fetchData() {
    try {
      if (lat && lon) {
        const weatherResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/getWeatherData`, {
          latitude: lat,
          longitude: lon
        }
        );
        setDailyForecasts(weatherResponse.data.dailyForecasts);
        console.log(weatherResponse.data.dailyForecasts);

      }
    } catch (error) {
      console.log("Error Fetching Summary Data: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [data]);

  const generateSummary = (summaryType: any) => {
    setButtonType(summaryType);
    navigator.geolocation.getCurrentPosition(
      async function () {

        setSummaryData('');
        setSummaryImage('');
        setSummaryAudio('');
        setLoadingProgress(0);
        setStatusError(false);

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
          if (dailyForecasts) {
            setLoadingStatus(true);
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
              setLoadingStatus(false);
              setSummaryData(res.data.summary);
              setSummaryImage(res.data.imageUrl);
              setSummaryAudio(res.data.audioBase64);
            }, 10000);
          }
        } catch (error) {
          clearInterval(interval);
          setLoadingStatus(false);
          setStatusError(true);
          console.log("Error Fetching Summary Data: ", error);
        }
      },
      function (error) {
        setLoadingStatus(false);
        setStatusError(true);
        console.error("Error getting Summary Data: ", error.message);
      }
    );
  };

  useEffect(() => {
    setSummaryData('');
    setSummaryImage('');
    setSummaryAudio('');
  }, [dailyForecasts]);

  return (
    <div>
      <h1
        className={`text-[#c4cad3] font-semibold text-sm`}
      >
        Weather Summary
      </h1>
      <div className={`mt-4 bg-[#202b3c] rounded-xl overflow-auto`}>
        <div className="p-5 flex justify-center flex-col gap-3">
          <div className="flex gap-3 justify-center">
            <Button
              className="rounded-full w-5/12 flex items-center justify-center"
              size="md"
              color="blue"
              onClick={() => generateSummary("creative")}
              disabled={loadingStatus}
            >
              {(!loadingStatus || buttonType !== "creative") ? (
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
              disabled={loadingStatus}
            >
              {(!loadingStatus || buttonType !== "pro") ? (
                <Typography className="font-semibold text-xs">
                  Professional
                </Typography>
              ) : (
                <Spinner color="red" />
              )}
            </Button>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-row justify-between w-2/3 gap-3">
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
                    disabled={loadingStatus}
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
                    disabled={loadingStatus}
                  />
                </ListItemPrefix>
                <Typography className="text-sm text-white">
                  Generate Audio
                </Typography>
              </label>
            </div>
            <div className="w-full flex justify-center">
              <h6 className="text-white">Click either <span className="font-bold">Creative</span> or <span className="font-bold">Professional</span> to generate a weather summary</h6>
            </div>
          </div>
          <div>
            {summaryData ? (
              <div className="border p-3 rounded-xl">
                <Typography color="white">{summaryData}</Typography>
              </div>
            ) : (
              <div className="border w-full flex flex-col space-x-3 justify-center items-center rounded-xl h-[545px]">

                <Image alt="sun" src="/images/sun.svg" width={200} height={200} />
                {
                  statusError ? (
                    <div className={statusError ? 'w-2/3' : 'invisible'}>
                      <Alert icon={<Exclamation />} color="red" onClose={() => setStatusError(false)}>Server Errors</Alert>
                    </div>
                  ) : (
                    <div className={loadingStatus ? 'w-1/2' : 'invisible'}>
                      <Progress value={loadingProgress} color="amber" />
                    </div>
                  )
                }
              </div>
            )}
          </div>
          {
            summaryImage && (
              <div className="w-full flex justify-center items-center">
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
    </div>
  );
};

export default Summary;
