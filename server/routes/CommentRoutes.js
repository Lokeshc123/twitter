const express = require("express");
const { isVerified, authorizeRoles } = require("../middleware/auth");
const {
  createComment,

  deleteComment,
  deleteCommentAdmin,
  updateComment,
} = require("../controller/CommentController");

const router = express.Router();

router.route("/new/:id").post(isVerified, createComment);
router.route("/update/:id").get(isVerified, updateComment);
router.route("/:id").delete(isVerified, deleteComment);
router
  .route("/admin/:id")
  .delete(isVerified, authorizeRoles("admin"), deleteCommentAdmin);

module.exports = router;
