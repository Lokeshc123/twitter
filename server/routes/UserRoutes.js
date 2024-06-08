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
router.route("/:userId").get(isVerified, getUserById);

module.exports = router;
