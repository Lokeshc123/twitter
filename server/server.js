const { app, server } = require("./app");
const dotenv = require("dotenv");
const connectDb = require("./config/database");
const cloudinary = require("cloudinary");
dotenv.config({ path: "server/config/.env" });
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/UserRoutes");
const tweetRoutes = require("./routes/TweetRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const express = require("express");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDb();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
