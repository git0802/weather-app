const Database = require("@replit/database"); // Import the database module
const db = new Database(); // Initialize the database instance
const fs = require("fs");
const path = require("path");

// Function to convert UTC date to Chicago time
function convertToChicagoTime(utcDate) {
  const chicagoOffset = 360; // Chicago is UTC-6 hours
  const localDate = new Date(utcDate);
  localDate.setMinutes(localDate.getMinutes() - chicagoOffset);
  return localDate.toLocaleString();
}

// Function to retrieve subscribers and write to CSV
async function exportSubscribersToCSV() {
  try {
    const subscriberKeys = await db.list("subscriber:");
    let csvContent = "Name,Email,IP Address,Timestamp\n";

    for (const key of subscriberKeys) {
      const subscriber = await db.get(key);
      const timestampChicago = subscriber.timestamp
        ? convertToChicagoTime(subscriber.timestamp)
        : "Not Available";
      const ipAddress = subscriber.ipAddress || "Not Available"; // Fallback if IP address is undefined
      csvContent += `"${subscriber.name}","${subscriber.email}","${ipAddress}","${timestampChicago}"\n`;
    }

    const csvFilePath = path.join(__dirname, "subscribers.csv");
    fs.writeFileSync(csvFilePath, csvContent);
    console.log(`Subscribers have been exported to ${csvFilePath}`);
  } catch (error) {
    console.error("Failed to export subscribers:", error);
  }
}

exportSubscribersToCSV();
