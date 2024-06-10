const express = require("express");
const {
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
} = require("../controller/UserController");
const { isVerified } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/:userId")
  .put(isVerified, updateUser)
  .delete(isVerified, deleteUser);

router.route("/all-login").get(isVerified, getUsers);
router.route("/all").get(getUserWithoutLogin);
router.route("/me").get(isVerified, getDetails);
router.route("/friend-requests").get(isVerified, getFriendRequestsReceived);
router.route("/:userId").get(isVerified, getUserById);
router.route("/follow/:userId").post(isVerified, sendFollowRequest);
router.route("/tweets/:userId").get(isVerified, getUserTweets);
router.route("/accept-follow/:friendId").post(isVerified, acceptFollowRequest);
router.route("/reject-follow/:friendId").post(isVerified, rejectFollowRequest);

module.exports = router;
