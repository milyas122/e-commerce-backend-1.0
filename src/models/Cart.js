const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  quantity: Number,
  total: Number,
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
