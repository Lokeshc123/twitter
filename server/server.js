const app = require("./app");
const dotenv = require("dotenv");
const connectDb = require("./config/database");
const cloudinary = require("cloudinary");
dotenv.config({ path: "server/config/.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
connectDb();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
