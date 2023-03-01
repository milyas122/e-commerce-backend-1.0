const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: String,
  category: String,
  image: [{ type: String }],
  stock: { type: Number, min: 0 },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //   add reviews
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
