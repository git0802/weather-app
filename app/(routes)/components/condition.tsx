import { WeatherData } from "@/types";
import IndividualCondition from "./individual-condition";
import { format, parseISO } from "date-fns";

interface ConditionProps {
  data: WeatherData | null;
}

const Condition: React.FC<ConditionProps> = ({ data }) => {
  let formattedData: { key: string; value: string | number }[] = []; // Create an array of strings to store the values

  if (data) {
    const {
      last_updated,
      feelslike_f,
      temp_f,
      pressure_mb,
      condition,
      wind_mph,
      wind_kph,
      wind_dir,
      humidity,
      cloud,
      uv,
      gust_mph,
      gust_kph,
      vis_km,
      vis_miles,
    } = data.current;

    // Push the desired values as strings into the array
    formattedData.push({
      key: "Last Updated",
      value: format(parseISO(last_updated), "h:mm a"),
    });
    // formattedData.push({
    //   key: "Temperature",
    //   value: temp_f + "°F",
    // });
    formattedData.push({
      key: "Feels like",
      value: Math.floor(feelslike_f) + "°F",
    });
    // formattedData.push({
    //   key: "Condition",
    //   value: condition.text,
    // });
    formattedData.push({ key: "Cloud", value: Math.floor(cloud) + "% ☁︎" });
    // formattedData.push({
    //   key: "Pressure",
    //   value: Math.floor(pressure_mb * 0.015) + " psi",
    // });
    formattedData.push({ key: "Wind mph", value: Math.floor(wind_mph) + " m/h" });
    // formattedData.push({ key: "Wind kph", value: wind_kph + " km/h" });
    formattedData.push({ key: "Wind Degree", value: wind_dir });
    formattedData.push({ key: "Humidity", value: Math.floor(humidity) + "% 🌢" });
    formattedData.push({ key: "UV", value: uv });
    formattedData.push({ key: "Gust mph", value: Math.floor(gust_mph) + " m/h" });
    // formattedData.push({ key: "Gust kph", value: gust_kph + " km/h" });
    formattedData.push({
      key: "Visibility in miles",
      value: Math.floor(vis_miles) + "  miles",
    });
    // formattedData.push({
    //   key: "Visibility in kilometer",
    //   value: vis_km + "  km",
    // });
  }

  return (
    <div>
      <div>
        <IndividualCondition value={formattedData} />
      </div>
    </div>
  );
};

export default Condition;
