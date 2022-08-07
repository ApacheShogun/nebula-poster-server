const express = require("express");
const { createPost, allPosts, deletePost, updatePost, onePost} = require("../controllers/postController");
const { checkAuth } = require("../middleware/checkAuth");
const router = express.Router();

//create a post
router.post('/', checkAuth ,createPost)

//get all posts
router.get('/', allPosts)

// get one post 
router.get('/:id', onePost)

// update post
router.put('/', checkAuth, updatePost)

//delete a post
router.delete('/:id', checkAuth, deletePost)

module.exports = router;