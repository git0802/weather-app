// dramaticWeatherRoutes.js
const express = require("express");
const router = express.Router();
const {
  generateDramaticSummary,
} = require("../controllers/dramaticWeatherController");

router.post("/generateSummary", generateDramaticSummary);

module.exports = router;
