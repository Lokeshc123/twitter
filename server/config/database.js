const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected successfully");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
