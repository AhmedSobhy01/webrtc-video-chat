const Room = require("../models/Room");

const deleteEmptyRooms = async () => {
    const dateThreshold = new Date();
    dateThreshold.setHours(dateThreshold.getHours() - 1);

    try {
        await Room.deleteMany({ users: { $size: 0 }, createdAt: { $lt: dateThreshold } });
    } catch (error) {
        console.error("Error deleting empty rooms:", error);
    }
};

module.exports = deleteEmptyRooms;
