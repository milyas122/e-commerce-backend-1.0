const Product = require("../models/Product");
const Favorite = require("../models/Favorite");

// Add product to favorite
async function addProductToFavorite(req, res) {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const product = await Product.findById({ _id: productId }, "_id").lean();

    if (!product)
      return res.status(400).json({ message: "Product is invalid" });

    // This will make this API Idempotent(Avoid product duplication)
    const favExist = await Favorite.findOne(
      { productId, userId },
      "_id"
    ).lean();
    if (favExist)
      return res
        .status(200)
        .json({ message: "Added to favorite successfully" });

    await Favorite.create({ userId, productId });

    return res.status(200).json({ message: "Added to favorite successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error Occurred" });
  }
}

// remove product from favorite
async function removeProductFromFavorite(req, res) {
  const productId = req.params.id;
  const userId = req.user.id;
  try {
    const favorite = await Favorite.findOneAndDelete({ productId, userId });
    if (!favorite) {
      return res.status(400).json({ message: "Product not exist" });
    }
    return res
      .status(200)
      .json({ message: "Remove from favorite successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = { addProductToFavorite, removeProductFromFavorite };
