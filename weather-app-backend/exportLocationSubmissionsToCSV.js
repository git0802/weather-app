const Database = require("@replit/database"); // Import the database module
const db = new Database(); // Initialize the database instance
const fs = require("fs");
const path = require("path");

// Function to convert UTC date to Chicago time
function convertToChicagoTime(utcDate) {
  const chicagoOffset = 360; // Chicago is UTC-6 hours (including daylight saving changes if any)
  const localDate = new Date(utcDate);
  localDate.setMinutes(localDate.getMinutes() - chicagoOffset);
  return localDate.toLocaleString();
}

// Function to retrieve location submissions and write to CSV
async function exportLocationSubmissionsToCSV() {
  try {
    console.log("Fetching location keys from database...");

    // Use both prefixes "Location:" and "location:" to retrieve keys
    const locationKeysWithCapital = await db.list("Location:");
    const locationKeysWithLowercase = await db.list("location:");

    // Combine the keys from both prefixes
    const locationKeys = [
      ...locationKeysWithCapital,
      ...locationKeysWithLowercase,
    ];

    console.log(`Found ${locationKeys.length} keys:`, locationKeys);

    if (locationKeys.length === 0) {
      console.log("No location data found in database.");
      return;
    }

    let csvContent = "Location,IP Address,Timestamp\n";

    for (const key of locationKeys) {
      try {
        console.log(`Fetching data for key: ${key}`);
        const submission = await db.get(key);

        if (!submission) {
          console.log(`No data found for key: ${key}`);
          continue;
        }

        const timestampChicago = submission.timestamp
          ? convertToChicagoTime(submission.timestamp)
          : "Not Available";
        const ipAddress = submission.ipAddress || "Not Available"; // Fallback if IP address is undefined
        // Assuming submission.location contains the location string
        csvContent += `"${submission.location}","${ipAddress}","${timestampChicago}"\n`;
      } catch (fetchError) {
        console.error(`Error fetching data for key ${key}:`, fetchError);
      }
    }

    const csvFilePath = path.join(__dirname, "location_submissions.csv");
    fs.writeFileSync(csvFilePath, csvContent);
    console.log(`Location submissions have been exported to ${csvFilePath}`);
  } catch (error) {
    console.error("Failed to export location submissions:", error);
  }
}

exportLocationSubmissionsToCSV();
