const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        users: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
