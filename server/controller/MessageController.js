const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { getrecid, io, userSocketMap } = require("../app");

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Log debug information
    console.log("Received message send request.");
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    // Find conversation or create a new one
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
        messages: [],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Save conversation and message
    await Promise.all([conversation.save(), newMessage.save()]);

    // Log debug information
    console.log("Message saved successfully.");

    // Attempt to retrieve receiverSocketId
    const receiverSocketId = userSocketMap[receiverId];
    console.log("Receiver Socket ID:", receiverSocketId);

    // Emit new message if receiverSocketId exists
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("New message emitted to receiver.");
    }

    res
      .status(200)
      .json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    // Find conversation
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendMessage, getConversation };
