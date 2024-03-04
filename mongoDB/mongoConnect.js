const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/testdb";

const mongoConnectdb = async () => {
  try {
    const con = await mongoose.connect(MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnectdb;
