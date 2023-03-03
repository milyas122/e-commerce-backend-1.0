const Product = require("../models/Product");
const Cart = require("../models/Cart");

async function addToCart(req, res) {
  const productId = req.params.id;
  const userId = req.user.id;
  const quantity = req.body.quantity || 1;
  let cart;
  try {
    const product = await Product.findById(productId, "_id");
    if (!product) {
      return res.status(400).json({ message: "Product not exist" });
    }
    cart = await Cart.findOne({ productId, userId }).lean();
    if (cart) {
      cart = await Cart.findOneAndUpdate(
        { productId, userId },
        { $inc: { quantity: quantity } }
      );
    } else {
      cart = await Cart.create({ productId, userId, quantity });
    }

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

// Update Cart

module.exports = { addToCart };
