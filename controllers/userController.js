const { Users, Followers } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
require("dotenv").config();

// SIGN UP USER
const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // validation
    if (!email || !password || !username) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }

    // if a user and email is already in the database
    const existsEmail = await Users.findOne({ where: { email: email } });
    const existsUsername = await Users.findOne({
      where: { username: username },
    });
    if (existsEmail) {
      throw Error("somebody is using that email");
    }
    if (existsUsername) {
      throw Error("Someone already have that username");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    //create jwt token
    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //send users the user and token
    res
      .status(200)
      .json({
        message: "user is signed up!",
        username,
        email,
        id: user.id,
        token: token,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      throw Error("this user does not exist");
    }

    const thePassword = await bcrypt.compare(password, user.password);
    if (!thePassword) {
      throw Error("wrong email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //send users the user and token
    res.status(200).json({
      message: "logged in user",
      username: user.username,
      id: user.id,
      email,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// GET USER PROFILE INFO

const profileInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const userInfo = await Users.findByPk(
      id,
      { include: [Followers], attributes: { exclude: ["password"] }},
    );

    res.status(200).json({ userInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// FOLLOW USER
const followUser = async (req, res) => {
  const { FollowerId, UserId} = req.body;
  const username = req.user.username;

  try {
    //toggling the followers
    const follow = await Followers.findOne({
      where: {
        FollowerId,
        UserId,
        username,
      },
    });

    if (!follow) {
      await Followers.create({ FollowerId: req.user.id, UserId, username });
      res.json({ message: "followed the user", followed: true });
    } else {
      await Followers.destroy({
        where: { FollowerId: req.user.id, UserId, username },
      });
      res.json({ message: "unfollowed the user", followed: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = { signUpUser, loginUser, profileInfo, followUser };
