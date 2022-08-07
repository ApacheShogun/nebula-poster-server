const express = require("express");
const router = express.Router();

//controller functions
const {signUpUser, loginUser} = require('../controllers/userController')

//sign up
router.post('/signup', signUpUser)
//login 
router.post('/login', loginUser)

module.exports = router