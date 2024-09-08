const cron = require("node-cron");
const deleteEmptyRooms = require("./jobs/deleteEmptyRooms");
const deleteOldRooms = require("./jobs/deleteOldRooms");

// Schedule the job to run every 5 minutes
cron.schedule("*/5 * * * *", () => {
    console.log("Running job to delete empty rooms...");
    deleteEmptyRooms();
});

// Schedule the job to run daily at midnight
cron.schedule("0 0 * * *", () => {
    console.log("Running daily job to delete old rooms...");
    deleteOldRooms();
});

module.exports = cron;
