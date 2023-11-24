//geocodingController.js
const axios = require("axios");

const geocode = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        params: {
          lat: lat,
          lon: lon,
          format: "json",
        },
      }
    );
    return response.data.display_name; // This will be the full address
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return null;
  }
};

module.exports = { geocode };
