const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log("Detabase Connected");
  } catch (e) {
    console.log(`Error in MongoDB ${e}`);
  }
};
module.exports = connectDB;
