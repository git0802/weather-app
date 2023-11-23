"use client";

import { WeatherData } from "@/types";
import React from "react";
import {
  Button,
  Spinner,
  Checkbox,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

interface SummaryProps {
  data: WeatherData | null;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const summaryData = `In the hallowed halls of the great winter kingdom, looming clouds gather like conspirators whispering across the sky on Thursday the 23rd, plotting an overcast silence with not a single droplet daring to escape their grasp. Yet, the very next day, the clouds find themselves riddled with indecision, scattering about as if unsure where to cast their fleeting shadows, the air tense with a meager 6% chance of precipitation, an emotionless lottery for even the most hopeful rain dancers. Behold the theatrical pause as Saturday's stage is set with yet another overcast monologue, doubtless rehearsing for the grand deluge to come.

  Come Sunday, the sky weeps with the fervor of unrequited love, showering the ground with 100% certainty—a tearful ovation in the midst of a mundane forecast, with winds murmuring secrets from the south-west. The grand finale approaches on Monday with a vengeful 25 mph wind shaking the very foundations of the week, whipping a flurry of light snow like audience applause, only to ease into a week of encores, once again cooling to the soft hisses of light snowfalls and the anticlimactic whispers of an almost indiscernible flurry.`;

  const loadingStatus = true;

  return (
    <div className={`mt-4 bg-[#202b3c] rounded-xl max-h-[560px] overflow-auto`}>
      <div className="p-5 flex justify-center flex-col gap-3">
        <div className="flex gap-3 justify-center">
          <Button
            className="rounded-full w-5/12 flex items-center justify-center"
            size="md"
            color="blue"
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
            <div className="w-full flex justify-center items-center bg-[#E7F9ED] rounded-xl h-[370px]">
              <Image alt="sun" src="/images/sun.svg" width={100} height={100} />
            </div>
          )}
        </div>
        <div className="w-full flex justify-center items-center bg-[#E7F9ED] rounded-xl h-[370px]">
          <Image alt="sun" src="/images/sun.svg" width={100} height={100} />
        </div>
        <div className="w-full">
          <audio id="song" className="block w-full max-w-md mx-auto" controls>
            <source
              src="https://open.spotify.com/track/7DE0I3buHcns00C0YEsYsY?si=5e0442c12f514f04"
              type="audio/mpeg"
            />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default Summary;
