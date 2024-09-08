const mongoose = require("mongoose");

const connectDB = async () => {
    return mongoose.connect(process.env.DB_URI).then(() => console.log("MongoDB connected..."));
};

module.exports = connectDB;
