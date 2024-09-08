const express = require("express");
const { createRoom, verifyRoom } = require("../controllers/roomController");
const { roomValidationRules } = require("../validators/roomValidator");

const router = express.Router();

router.post("/create", roomValidationRules, createRoom);
router.post("/verify", roomValidationRules, verifyRoom);

module.exports = router;
