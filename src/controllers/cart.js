const Product = require("../models/Product");
const Cart = require("../models/Cart");

//POST: /cart/add/:id
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

//GET: /cart/remove/:id
async function removeFromCart(req, res) {
  const cartId = req.params.id;

  try {
    const cartItem = await Cart.findById(cartId, "_id");
    if (!cartItem) {
      return res.status(400).json({ message: "Cart does not exist" });
    }
    await Cart.findByIdAndDelete({ _id: cartId });
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

async function deleteCart(req, res) {
  userId = req.user.id;
  try {
    const deleteCount = await Cart.deleteMany({ userId });
    return res
      .status(200)
      .json({ deleteCount, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error Occurred" });
  }
}

// Remove whole user cart
module.exports = { addToCart, removeFromCart, deleteCart };
