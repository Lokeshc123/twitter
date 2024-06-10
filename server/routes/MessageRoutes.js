const express = require("express");
const router = express.Router();

const {
  sendMessage,

  getConversation,
} = require("../controller/MessageController");

router.post("/sendmessage", sendMessage);
router.get("/getmessages/:senderId/:receiverId", getConversation);

module.exports = router;
