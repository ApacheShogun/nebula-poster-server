const express = require("express");
const { getComments, createComment, deleteComment, updateComment } = require("../controllers/commentController");
const router = express.Router();
const { checkAuth } = require("../middleware/checkAuth");


// get all comments
router.get('/:postId', getComments)

// create comment
router.post('/', checkAuth, createComment)

// update comment
router.put('/', checkAuth, updateComment)

// delete comment
router.delete('/:commentId', checkAuth, deleteComment)

module.exports = router;