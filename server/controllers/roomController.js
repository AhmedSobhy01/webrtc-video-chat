const { validationResult } = require("express-validator");
const Room = require("../models/Room");

const createRoom = async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).json({ status: false, message: validationResult(req).array()[0].msg, errors: validationResult(req).array() });

    const { roomCode, password } = req.body;

    const roomExists = await Room.findOne({ code: roomCode });

    if (roomExists) return res.status(400).json({ status: false, message: "Room already exists" });

    const room = new Room({ code: roomCode, password, users: [] });
    await room.save();

    res.status(201).json({ status: true, message: "Room created" });
};

const verifyRoom = async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).json({ status: false, message: validationResult(req).array()[0].msg, errors: validationResult(req).array() });

    const { roomCode, password } = req.body;

    const room = await Room.findOne({ code: roomCode });

    if (!room) return res.status(400).json({ status: false, message: "Room does not exist" });
    if (room.password !== password) return res.status(400).json({ status: false, message: "Incorrect password" });
    if (room.users.length >= 2) return res.status(400).json({ status: false, message: "Room is full" });

    res.status(200).json({ status: true, message: "Room verified" });
};

module.exports = { createRoom, verifyRoom };
