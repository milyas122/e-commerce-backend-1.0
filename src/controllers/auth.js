const User = require("../models/User");
const { signupSchema } = require("../utils/validations/auth");
const validate = require("../utils/validate");

//POST: /auth/signup
async function signup(req, res) {
  let existingUser;
  let user;

  try {
    const cleanFields = await validate(signupSchema, req.body);
    delete cleanFields.confirmPassword;

    existingUser = await User.findOne({ email: cleanFields.email });
    if (existingUser)
      return res.status(400).json({ message: "Email is already exist " });
    const userObj = new User({ ...cleanFields });
    user = await userObj.save();
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
