const openaiService = require("../services/openaiService");

const getLocationCoordinates = async (req, res) => {
  try {
    const locationInput = req.body.location;
    if (typeof locationInput !== "string" || locationInput.trim() === "") {
      return res.status(400).json({ error: "Invalid location input." });
    }

    // Modify this line to use the correct function from openaiService
    const coordinates = await openaiService.getCoordinates(locationInput);

    // Only send a response once, either success or error
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      res.json(coordinates);
    } else {
      res
        .status(500)
        .json({ error: "No valid coordinates returned from OpenAI." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getLocationCoordinates,
};
