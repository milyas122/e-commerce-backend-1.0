const User = require("../models/User");
const Favorite = require("../models/Favorite");

async function getAllUsers(req, res) {
  const { page = 1 } = req.query;
  const limit = 2;
  try {
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await User.countDocuments();
    return res
      .status(200)
      .json({
        message: "Success",
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
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
    return res.status(500).json({ message: "Error Occurred " });
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

async function favoriteProducts(req, res) {
  const userId = req.user.id;
  try {
    const products = await Favorite.find({ userId }, "productId -_id").populate(
      "productId"
    );
    const favoriteProducts = products.map((p) => {
      return p.productId;
    });

    return res.status(200).json({ favoriteProducts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = { getAllUsers, getUser, updateProfile, favoriteProducts };
