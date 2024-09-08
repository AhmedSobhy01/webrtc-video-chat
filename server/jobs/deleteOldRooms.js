const Room = require("../models/Room");

const deleteOldRooms = async () => {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - 1);

    try {
        await Room.deleteMany({ createdAt: { $lt: dateThreshold } });
    } catch (error) {
        console.error("Error deleting old rooms:", error);
    }
};

module.exports = deleteOldRooms;
