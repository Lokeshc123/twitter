const Tweet = require("../models/Tweets");
const User = require("../models/User");

const createTweet = async (req, res) => {
  const { text, image, video } = req.body;
  try {
    const tweet = await Tweet.create({
      user: req.user.id,
      text,
      image,
      video,
    });
    await tweet.save();
    res.status(201).json({
      success: true,
      message: "Tweet created successfully",
      tweet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a tweet
const updateTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    res.status(200).json({ message: "Tweet updated successfully", tweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("user");
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find({ user: req.params.userId }).populate(
      "user"
    );
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const likeTweet = async (req, res) => {
  try {
    let tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    if (tweet.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already liked this" });
    }
    tweet = await Tweet.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.user.id } },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "Tweet liked successfully", tweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const unlikeTweet = async (req, res) => {
  try {
    let tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    if (!tweet.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "You have not liked this" });
    }
    tweet = await Tweet.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user.id } },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "Tweet unliked successfully", tweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// RETWEET
const retweet = async (req, res) => {
  try {
    let tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    if (tweet.retweets.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You have already retweeted this" });
    }
    tweet = await Tweet.findByIdAndUpdate(
      req.params.id,
      { $push: { retweets: req.user.id } },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "Tweet retweeted successfully", tweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTweet,
  getAllTweets,
  updateTweet,
  deleteTweet,
  getUserTweets,
  likeTweet,
  unlikeTweet,
  retweet,
};
