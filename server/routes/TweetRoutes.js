const express = require("express");
const { isVerified } = require("../middleware/auth");
const {
  createTweet,
  getAllTweets,
  updateTweet,
  deleteTweet,
  getUserTweets,
  likeTweet,
  unlikeTweet,
} = require("../controller/TweetController");
const router = express.Router();

router.route("/new").post(isVerified, createTweet);
router.route("/").get(isVerified, getAllTweets);
router
  .route("/:id")
  .put(isVerified, updateTweet)
  .delete(isVerified, deleteTweet);

router.route("/:userID").get(isVerified, getUserTweets);
router.route("/like/:id").put(isVerified, likeTweet);
router.route("/unlike/:id").put(isVerified, unlikeTweet);

module.exports = router;
