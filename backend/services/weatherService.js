//weatherService.js
const axios = require("axios");

async function getWeatherForecast(latitude, longitude) {
  try {
    // Check if latitude and longitude are provided
    if (!latitude || !longitude) {
      throw new Error("Latitude and longitude are required.");
    }

    // Log to confirm function call and parameters
    console.log(
      `Making API call to get weather forecast for lat: ${latitude}, lon: ${longitude}`
    );

    const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${process.env.OPENWEATHER_API_KEY}`;

    const response = await axios.get(weatherApiUrl);

    // Log to check the response from the weather API
    console.log(`Weather API response status: ${response.status}`);

    const weatherData = response.data;

    // Process and return the relevant weather data
    const dailyForecasts = weatherData.daily.slice(0, 8).map((day) => ({
      date: new Date(day.dt * 1000),
      highTemp: Math.round(day.temp.max),
      lowTemp: Math.round(day.temp.min),
      humidity: day.humidity,
      windSpeed: Math.round(day.wind_speed),
      windDirection: day.wind_deg,
      weatherDescription: day.weather.map((w) => w.description).join(", "),
      precipitationProbability: day.pop,
    }));

    // Log to confirm the processed data before returning
    console.log("Processed daily forecasts:", dailyForecasts);

    return dailyForecasts;
  } catch (error) {
    // Log the error with more details
    console.error("Error in getWeatherForecast:", error.message);
    throw error; // Rethrow the error so it can be caught and handled by the caller
  }
}

module.exports = {
  getWeatherForecast,
};
