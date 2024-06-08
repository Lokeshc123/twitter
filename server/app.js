const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("./routes/UserRoutes");
const tweet = require("./routes/TweetRoutes");
const comment = require("./routes/CommentRoutes");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", user);
app.use("/api/tweets", tweet);
app.use("/api/comments", comment);

module.exports = app;
