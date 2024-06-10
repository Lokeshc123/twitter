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
  sendMsgRequest,
  acceptMsgRequest,
  rejectMsgRequest,
  getAllMSGRequests,
  getAllMsgs,
} = require("../controller/UserController");
const { isVerified } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/all-login").get(isVerified, getUsers);
router.route("/all").get(getUserWithoutLogin);
router.route("/me").get(isVerified, getDetails);
router.route("/friend-requests").get(isVerified, getFriendRequestsReceived);
router.route("/follow/:userId").post(isVerified, sendFollowRequest);
router.route("/tweets/:userId").get(isVerified, getUserTweets);
router.route("/accept-follow/:friendId").post(isVerified, acceptFollowRequest);
router.route("/reject-follow/:friendId").post(isVerified, rejectFollowRequest);
router.route("/send-messagereq/:friendId").post(isVerified, sendMsgRequest);
router.route("/acc-message/:friendId").post(isVerified, acceptMsgRequest);
router.route("/reject-message/:friendId").post(isVerified, rejectMsgRequest);
router.route("/all-msgreq").get(isVerified, getAllMSGRequests);
router.route("/getmsg").get(isVerified, getAllMsgs);
router
  .route("/:userId")
  .put(isVerified, updateUser)
  .delete(isVerified, deleteUser)
  .get(isVerified, getUserById);

module.exports = router;
