const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("./routes/UserRoutes");
const tweet = require("./routes/TweetRoutes");
const comment = require("./routes/CommentRoutes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/api/users", user);
app.use("/api/tweets", tweet);
app.use("/api/comments", comment);

module.exports = app;
