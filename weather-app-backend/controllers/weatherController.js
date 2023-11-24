const weatherService = require("../services/weatherService");

const getWeatherData = async (req, res) => {
  try {
    // Log to confirm function call and to show the received latitude and longitude
    console.log(
      `Received latitude: ${req.body.latitude}, longitude: ${req.body.longitude}`
    );

    // Check if latitude and longitude are numbers
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error("Latitude and longitude must be valid numbers.");
      return res.status(400).json({ error: "Invalid latitude or longitude." });
    }

    const dailyForecasts = await weatherService.getWeatherForecast(
      latitude,
      longitude
    );

    // Log to confirm that data was received from the weather service
    console.log(
      "Daily forecasts received from the weather service:",
      dailyForecasts
    );

    res.json({ dailyForecasts });
  } catch (error) {
    // Log the error with more context
    console.error("Error in getWeatherData:", error.message);

    // Send a response with the error message
    res
      .status(500)
      .json({ error: "An error occurred while fetching weather data." });
  }
};

module.exports = {
  getWeatherData,
};
