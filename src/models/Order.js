const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
  title: String,
  description: String,
  category: String,
  price: Number,
  images: [{ type: String }],
  quantity: { type: Number, require: true },
  total: { type: Number, require: true },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
      select: false,
    },
    orderDetail: {
      type: [orderDetailSchema],
    },
    total: { type: Number, require: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
