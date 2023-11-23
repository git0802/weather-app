//locationRouts.js
const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post(
  "/getLocationCoordinates",
  locationController.getLocationCoordinates
);

module.exports = router;
