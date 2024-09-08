const { body } = require("express-validator");

const roomValidationRules = [body("roomCode").isString().withMessage("Password is required").trim().notEmpty().withMessage("Room code is required"), body("password").isString().withMessage("Password is required").trim().notEmpty().withMessage("Password is required")];

module.exports = {
    roomValidationRules,
};
