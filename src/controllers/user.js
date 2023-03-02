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

async function updateProfile(req, res) {
  const { name, address, city, phone, country, image } = req.body;
  const user_id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(user_id, {
      name,
      address,
      city,
      phone,
      country,
      image,
    });

    if (!user)
      return res.status(500).json({ message: "Unable to update user" });

    return res.status(200).json({ user: user, message: "Updated" });
  } catch (e) {
    return res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = { getAllUsers, getUser, updateProfile };
