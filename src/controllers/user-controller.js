const User = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json({ users, message: "success" });
  } catch (e) {
    return res.status(500).json({ message: "Error Occurred" });
  }
}

async function getUser(req, res) {
  const user_id = req.params.id;
  try {
    const user = await User.findById(user_id);
    return res.status(200).json({ user, message: "success" });
  } catch (e) {
    return res.status(500).json({ message: "Error Occurred" });
  }
}
module.exports = { getAllUsers, getUser };
