const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  const { name, email, password, confirmPassword, country, image, isSeller } =
    req.body;
  let existingUser;
  let user;

  try {
    existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email is already exist " });
    const user_obj = new User({
      name,
      email,
      country,
      password,
      image,
      isSeller,
    });
    user = await user_obj.save();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
  return res
    .status(201)
    .json({ user: user, message: "User created successfully " });
}

async function login(req, res) {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User not exist" });

    const isMatched = await existingUser.comparePassword(password);
    if (!isMatched)
      return res.status(404).json({ message: "Email or password is invalid" });

    const token = existingUser.generateToken();
    return res
      .status(200)
      .json({ message: "Login Successfully..", token: token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { signup, login };
