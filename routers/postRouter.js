const express = require("express");
const { createPost, allPosts, deletePost, updatePost, onePost, profilePosts} = require("../controllers/postController");
const { checkAuth } = require("../middleware/checkAuth");
const router = express.Router();

//create a post
router.post('/', checkAuth ,createPost)

//get all posts
router.get('/', allPosts)

// get all posts for profile page
router.get('/profile/user/:id', profilePosts)

// get one post 
router.get('/:id', onePost)

// update post
router.put('/', checkAuth, updatePost)

//delete a post
router.delete('/:id', checkAuth, deletePost)

module.exports = router;