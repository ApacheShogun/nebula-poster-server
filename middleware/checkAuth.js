const jwt = require("jsonwebtoken");
require('dotenv').config()
const { Users } = require("../models");

const checkAuth =  async (req, res, next) => {
  // verify user is authenticated
  const jwtToken = req.header("jwtToken");

  if (!jwtToken) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  try {
    const {id} = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = await Users.findByPk(id, {attributes: {exclude: ['password']}})
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
};

module.exports = { checkAuth };