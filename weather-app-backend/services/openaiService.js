const { OpenAIApi, Configuration } = require("openai");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.open_api_key,
});

async function getCoordinates(locationInput) {
  try {
    const geocodePrompt = `Please provide a JSON response with the keys "location", "latitude", and "longitude" for the location ${locationInput}.`;

    const geocodeResponse = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: "JSON" },
        { role: "system", content: geocodePrompt },
      ],
      response_format: { type: "json_object" },
    });

    const parsedContent = JSON.parse(
      geocodeResponse.choices[0].message.content
    );

    if (parsedContent && parsedContent.latitude && parsedContent.longitude) {
      return {
        latitude: parsedContent.latitude,
        longitude: parsedContent.longitude,
      };
    } else {
      throw new Error("No valid coordinates returned from OpenAI.");
    }
  } catch (error) {
    console.error("Error in getCoordinates:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}

module.exports = {
  getCoordinates,
};
