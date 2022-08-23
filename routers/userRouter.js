const express = require("express");
const router = express.Router();

//controller functions
const {signUpUser, loginUser, profileInfo, followUser} = require('../controllers/userController');
const { checkAuth } = require("../middleware/checkAuth");

//sign up
router.post('/signup', signUpUser)
//login 
router.post('/login', loginUser)

//user profile info
router.get('/profile/:id', profileInfo)

// follow user
router.post('/follow', checkAuth, followUser)

module.exports = router