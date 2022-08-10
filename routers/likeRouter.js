const express = require("express");
const { likePost, getUserlikes } = require("../controllers/likeController");
const router = express.Router();
const { checkAuth } = require("../middleware/checkAuth");

router.post('/', checkAuth, likePost)
router.get('/', checkAuth, getUserlikes)

module.exports = router