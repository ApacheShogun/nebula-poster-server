const express = require("express");
const {
  getComments,
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  getCommentLikes,
} = require("../controllers/commentController");
const router = express.Router();
const { checkAuth } = require("../middleware/checkAuth");

// get all comments
router.get("/:postId", getComments);

// create comment
router.post("/", checkAuth, createComment);

// update comment
router.put("/", checkAuth, updateComment);

// delete comment
router.delete("/:commentId", checkAuth, deleteComment);

// like a comment
router.post("/likes", checkAuth, likeComment);

// get all comment likes
router.get("/likes/allLikes", checkAuth, getCommentLikes);

module.exports = router;
