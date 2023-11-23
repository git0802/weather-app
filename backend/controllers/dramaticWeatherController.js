//dramaticWeatherController.js
const axios = require("axios");
const OpenAI = require("openai");
const { geocode } = require("./geocodingController");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const WALKSCORE_API_KEY = process.env.WALKSCORE_API_KEY; // Ensure you have this in your .env file

async function textToSpeech(text) {
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: text,
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    const audioBase64 = buffer.toString("base64");
    return { audioBase64 };
  } catch (error) {
    console.error("Error in text-to-speech conversion:", error);
    throw error;
  }
}

async function generateImage(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      { model: "dall-e-3", prompt: prompt, n: 1, size: "1024x1024" },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error("Error in image generation:", error);
    throw error;
  }
}

// async function getWalkScore(lat, lon, address, WALKSCORE_API_KEY) {
// try {
//   address = await geocode(lat, lon);
// Construct the API URL with query parameters
//   const url = `https://api.walkscore.com/score?format=json&address=${encodeURIComponent(
//     address
//    )}&lat=${lat}&lon=${lon}&wsapikey=${WALKSCORE_API_KEY}`;

// Make an HTTP GET request to the Walk Score API
//    const response = await axios.get(url);

// Return the API response data
//    return response.data;
//  } catch (error) {
//    console.error("Error fetching Walk Score:", error);
//    return null; // Return null or handle the error as appropriate
//  }
//}

const generateDramaticSummary = async (req, res) => {
  if (!Array.isArray(req.body.dailyForecasts)) {
    return res
      .status(400)
      .json({ error: "Invalid weather data format: Expected an array." });
  }

  //  let walkScore;
  // try {
  //  if (req.body.summaryType && req.body.summaryType === "creative")
  //    walkScore = await getWalkScore(req.body.lat, req.body.lon, req.body.address, WALKSCORE_API_KEY)
  // }
  //catch (err) {
  // console.error("Failed to get walkscore")
  //}

  const prompt = createPrompt(
    req.body.dailyForecasts,
    req.body.summaryType ?? "creative"
  );

  const createImagePrompt = (summary) => {
    // Append the instruction to the summary to form the image prompt
    return `${summary} Please don't produce any text or words in your final image, only the image without text in the image.  I don't want any numbers or character letters.  Just a creative image only.  Please don't use any characters or text in the image - it's important to me and my livelyhood!`;
  };

  try {
    const context = createContext(req.body.summaryType ?? "creative");
    const chatResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content: context,
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = chatResponse.data.choices[0].message.content;
    let audioData;
    if (req.body.audio) {
      audioData = await textToSpeech(summary);
    }
    // Create a prompt for the image that requests no text
    const imagePrompt = createImagePrompt(summary);

    // Now call the function to generate the image with the image-specific prompt
    let imageUrl;
    if (req.body.picture) imageUrl = await generateImage(imagePrompt);
    console.log({ reqbody: req.body });

    res.json({ summary, audioBase64: audioData?.audioBase64, imageUrl });
  } catch (error) {
    console.error("Error while generating dramatic summary:", error);
    res.status(500).json({
      error: "Error while generating dramatic summary.",
      details: error.message,
    });
  }
};

const createContext = (promptType) => {
  if (promptType === "pro") {
    return `You are a professional weather reporter, giving clear explanations of the weather data.`;
  } else
    return `You are a witty and funny AI who creates dramatic summaries of weather data.`;
};

const createPrompt = (
  weatherData,
  promptType = "creative",
  walkScore = null
) => {
  let prompt =
    "Here's the weather data for the upcoming week, you will tell me a dramatic narative about it:";

  weatherData.forEach((day, index) => {
    prompt += `On ${new Date(day.date).toDateString()}, a high of ${
      day.highTemp
    }° and a low of ${day.lowTemp}°. `;
    prompt += `The day will be marked by ${
      day.weatherDescription
    }, with a ${Math.round(
      day.precipitationProbability * 100
    )}% chance of precipitation. `;
    prompt += `Winds will travel at ${
      day.windSpeed
    } mph, coming from the ${degreesToCardinal(day.windDirection)}. `;
    if (index !== weatherData.length - 1) prompt += "And then, ";
  });

  if (promptType === "pro") {
    prompt += "Now give me 5 short sentences about this weather data";
  } else {
    prompt += `Now give me about 5 sentences about this weather data and make it funny and or dramatic!  Only choose really creative sentences and don't make it more than 5 sentences.`;
  }
  return prompt;
};

// Helper function to convert degrees to cardinal directions
const degreesToCardinal = (deg) => {
  const val = Math.floor(deg / 22.5 + 0.5);
  const cardinalDirections = [
    "North",
    "North-North-East",
    "North-East",
    "East_North_East",
    "East",
    "East-South-East",
    "South-East",
    "South-South-East",
    "South",
    "South-South-West",
    "Wouth-West",
    "West-South-West",
    "West",
    "West-North-West",
    "North-West",
    "North-North-West",
  ];
  return cardinalDirections[val % 16];
};

module.exports = { generateDramaticSummary };
