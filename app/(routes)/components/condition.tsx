import { WeatherData } from "@/types";
import IndividualCondition from "./individual-condition";
import { format, parseISO } from "date-fns";

interface ConditionProps {
    data: WeatherData | null;
}

const Condition: React.FC<ConditionProps> = ({ data }) => {
    let formattedData: { key: string; value: string | number }[] = []; // Create an array of strings to store the values

    if (data) {
        const { last_updated, feelslike_c, wind_mph, wind_kph, wind_degree, humidity, cloud, uv, gust_mph, gust_kph, vis_km, vis_miles } = data.current;

        // Push the desired values as strings into the array
        formattedData.push({ key: 'Last Updated', value: format(parseISO(last_updated), "MMMM d, yyyy h:mm a") });
        formattedData.push({ key: 'Feels like in Celcius', value: feelslike_c + '°' });
        formattedData.push({ key: 'Wind mph', value: wind_mph + ' m/h' });
        formattedData.push({ key: 'Wind kph', value: wind_kph + ' km/h' });
        formattedData.push({ key: 'Wind Degree', value: wind_degree + '°' });
        formattedData.push({ key: 'Humidity', value: humidity + '% 🌢' });
        formattedData.push({ key: 'Cloud', value: cloud + '% ☁︎' });
        formattedData.push({ key: 'UV', value: uv });
        formattedData.push({ key: 'Gust mph', value: gust_mph + ' m/h' });
        formattedData.push({ key: 'Gust kph', value: gust_kph + ' km/h' });
        formattedData.push({ key: 'Visibility in miles', value: vis_miles + ' m' });
        formattedData.push({ key: 'Visibility in kilometer', value: vis_km + '  km' });
    }

    return (
        <div className="mt-4">
            <div className="py-5">
                <IndividualCondition value={formattedData} />
            </div>
        </div>
    );
}

export default Condition;
