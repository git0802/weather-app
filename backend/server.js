//server.js
const express = require("express");
require("dotenv").config();
const locationRoutes = require("./routes/locationRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const { getLocationCoordinates } = require("./controllers/locationController");
const dramaticWeatherRoutes = require("./routes/dramaticWeatherRoutes");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json({limit: '50mb'})); // Increase JSON limit
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // Increase URL-encoded limit

app.set("trust proxy", true); // This line should be after const app = express();

const fs = require("fs");

// Serve ads.txt file
app.get("/ads.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "ads.txt"));
});

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Define a route for the root URL
// In your server.js, when rendering the index.ejs
app.use("/generateSummary", async (req, res, next) => {
  let visitorKey = `Location:${new Date()}`;
  let ip = getRealIP(req);
  await db.set(visitorKey, {
    location: req.body.address ?? "",
    ipAddress: ip,
    timestamp: new Date(),
  });
  next();
});
app.get("/", (req, res) => {
  res.render("index", { latitude: null, longitude: null, audioBase64: null }); // Initially, audioBase64 is null
});

// Use routes from the routes files
app.use(locationRoutes);
app.use(weatherRoutes);
app.use(dramaticWeatherRoutes);

const Database = require("@replit/database");
const db = new Database();

// Function to get the real IP address from the request
const getRealIP = (req) => {
  return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
};

//subscriber code to save to database for retrevial later
app.post("/subscribe", async (req, res) => {
  const { name, email } = req.body;
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const timestamp = new Date(); // Capture the timestamp

  try {
    // Generate a unique key for the new subscriber
    const subscriberKey = `subscriber:${Date.now()}`;

    // Save the subscriber's data along with IP address and timestamp
    await db.set(subscriberKey, { name, email, ipAddress, timestamp });

    res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error subscribing", error);
    res.status(500).json({ message: "Error subscribing" });
  }
});

// Define the /getLocationCoordinates route
app.post("/getLocationCoordinates", async (req, res) => {
  try {
    const locationInput = req.body.location;

    // Ensure that you have a valid locationInput before proceeding
    if (typeof locationInput !== "string" || locationInput.trim() === "") {
      console.error("Invalid location input.");
      return res.status(400).json({ error: "Invalid location input." });
    }

    // Fetch coordinates from your locationController
    const coordinates = await getLocationCoordinates(locationInput);
    console.log("Coordinates retrieved:", coordinates);

    if (coordinates.latitude && coordinates.longitude) {
      // Log success in retrieving coordinates
      console.log("Successfully retrieved coordinates:", coordinates);

      // Send the coordinates as a response
      res.json(coordinates);
    } else {
      console.error("Could not retrieve coordinates.");
      res.status(500).json({ error: "Could not retrieve coordinates." });
    }
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Define a route to handle location submissions
app.post("/submitLocation", async (req, res) => {
  try {
    const locationInput = req.body.location;
    const ipAddress = getRealIP(req); // Get the real IP address from the request
    const timestamp = new Date(); // Capture the current timestamp

    // Ensure that you have a valid locationInput before proceeding
    if (typeof locationInput !== "string" || locationInput.trim() === "") {
      console.error("Invalid location input.");
      return res.status(400).json({ error: "Invalid location input." });
    }

    // Generate a unique key for the location submission
    // We'll use a ternary operator to determine the prefix based on your criteria
    const locationSubmissionPrefix = locationInput.startsWith("Location:")
      ? "Location:"
      : "location:";
    const locationSubmissionKey = `${locationSubmissionPrefix}${Date.now()}`;

    console.log(`Storing location data under key: ${locationSubmissionKey}`);

    // Save the location submission's data
    await db.set(locationSubmissionKey, {
      location: locationInput,
      ipAddress: ipAddress,
      timestamp: timestamp.toISOString(),
    });

    console.log(`Data stored under key: ${locationSubmissionKey}`);

    // Immediately try to retrieve the stored data to verify
    const storedData = await db.get(locationSubmissionKey);
    console.log(`Retrieved data for verification:`, storedData);

    // Send a success response
    res.status(200).json({ message: "Location submission successful" });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
