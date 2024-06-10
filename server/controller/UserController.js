const User = require("../models/User");
const bycrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/Token");
const register = async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const usernameExist = await User.findOne({
      username,
    });
    if (usernameExist) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hassedPassword = await bycrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      username,
      password: hassedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update the existing user

const updateUser = async (req, res) => {
  try {
    const { images, ...otherFields } = req.body;
    let uploadedImages = [];
    console.log("Image", images);
    if (Array.isArray(images) && images.length > 0) {
      for (const imagePath of images) {
        const result = await cloudinary.v2.uploader.upload(imagePath, {
          folder: "users",
        });
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }
    console.log("Uploaded images", uploadedImages);

    const updateData = { ...otherFields };

    // Update avatar if there are uploaded images
    if (uploadedImages.length > 0) {
      updateData.avatar = uploadedImages[0];
    }

    const user = await User.findByIdAndUpdate(req.params.userId, updateData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete the exisitng user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all the users expect the current user
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all the users
const getUserWithoutLogin = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get your detail
const getDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Send Follow Request
const sendFollowRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.followers.includes(req.user.id)) {
      return res.status(400).json({ message: "Already following the user" });
    }
    if (user.followRequestsReceived.includes(req.user.id)) {
      return res.status(400).json({ message: "Already sent follow request" });
    }
    if (req.user.followRequestsSent.includes(user.id)) {
      return res.status(400).json({ message: "Already sent follow request" });
    }
    user.followRequestsReceived.push(req.user.id);
    req.user.followRequestsSent.push(user.id);
    await user.save();
    await req.user.save();
    res.status(200).json({ message: "Follow request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all tweets of user by id
const getUserTweets = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("tweets");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ tweets: user.tweets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getFriendRequestsReceived = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("followRequestsReceived");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ followRequestsReceived: user.followRequestsReceived });
  } catch (error) {
    console.error("Error fetching friend requests received:", error.message);
    res.status(500).json({ message: error.message });
  }
};
// Accept a follow request
const acceptFollowRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.friendId;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.followers.includes(friendId)) {
      return res.status(400).json({ message: "Already following the user" });
    }
    if (friend.following.includes(userId)) {
      return res.status(400).json({ message: "Already following the user" });
    }
    if (!user.followRequestsReceived.includes(friendId)) {
      return res.status(400).json({ message: "No follow request found" });
    }
    user.followers.push(friendId);
    friend.following.push(userId);
    user.followRequestsReceived = user.followRequestsReceived.filter(
      (id) => id.toString() !== friendId
    );
    friend.followRequestsSent = friend.followRequestsSent.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Follow request accepted" });
  } catch (error) {
    console.error("Error accepting follow request:", error.message);
    res.status(500).json({ message: error.message });
  }
};
const rejectFollowRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.friendId;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }
    user.followRequestsReceived = user.followRequestsReceived.filter(
      (id) => id.toString() !== friendId
    );
    friend.followRequestsSent = friend.followRequestsSent.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await friend.save();
    res.status(200).json({ message: "Follow request rejected" });
  } catch (error) {
    console.error("Error rejecting follow request:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getUsers,
  getUserWithoutLogin,
  getDetails,
  getUserById,
  sendFollowRequest,
  getUserTweets,
  getFriendRequestsReceived,
  acceptFollowRequest,
  rejectFollowRequest,
};
