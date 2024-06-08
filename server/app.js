const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", user);

module.exports = app;
