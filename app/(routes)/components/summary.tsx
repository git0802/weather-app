"use client";

import { WeatherData } from "@/types";
import React from "react";
import { Button } from "@material-tailwind/react";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

interface SummaryProps {
  data: WeatherData | null;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  //   const am = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //   const currentStatus = Number(new Date().getHours().toFixed());

  return (
    <div className={`mt-4 bg-[#202b3c] rounded-xl`}>
      <div className="p-5">
        <div>
          <Button className="w-2/5 rounded-l-full bg-[#2196F3]">
            Creative
          </Button>
          <Button className="w-2/5 rounded-r-full bg-[#FFC107]">
            Professional
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Summary;
