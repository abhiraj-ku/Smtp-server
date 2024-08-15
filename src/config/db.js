const mongoose = require("mongoose");
const { DB_URI } = require("./constants"); // Correct path to constants

console.log("DB_URI from constants:", process.env.DB_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
