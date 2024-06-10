const Message = require("../models/Message");
const User = require("../models/User");
const Conversation = require("../models/Conversation");

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Find conversation or create a new one
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }, // Use $all operator
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
        messages: [], // Initialize messages array
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Push the message ID (not the entire message object)
    conversation.messages.push(newMessage._id);

    // Save conversation and message

    await Promise.all([conversation.save(), newMessage.save()]); // Optimized with Promise.all

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    // Find conversation
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }, // Use $all operator
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { sendMessage, getConversation };
