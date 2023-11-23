//weatherRoutes.js
const express = require("express");
const router = express.Router();
const { getWeatherData } = require("../controllers/weatherController");

// Define the route to get weather data by coordinates
// The client should make a POST request to this route after retrieving coordinates
router.post("/getWeatherData", getWeatherData);

module.exports = router;
