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
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user_obj = new User({
      name,
      email,
      password: hashPassword,
      country,
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

module.exports = { signup };
