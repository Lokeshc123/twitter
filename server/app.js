const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("./routes/UserRoutes");
const tweet = require("./routes/TweetRoutes");
const comment = require("./routes/CommentRoutes");
const message = require("./routes/MessageRoutes");
const http = require("http");
const socketIo = require("socket.io");

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
app.use("/api/messages", message);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const socketUsers = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  const userId = socket.handshake.query.userId;
  if (userId) {
    socketUsers[userId] = socket.id;
  }
  io.emit("onlineUsers", Object.keys(socketUsers));
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete socketUsers[userId];
    io.emit("onlineUsers", Object.keys(socketUsers));
  });
});
module.exports = { app, io, server };
