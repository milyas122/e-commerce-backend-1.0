const Product = require("../models/Product");

async function addProduct(req, res) {
  let body = req.body;

  body["seller"] = req.user.id;
  try {
    const product = new Product({ ...req.body });
    product.save();
    return res
      .status(201)
      .json({ product: product, message: "Added Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add product" });
  }
}

// Update Product

// Get single product

module.exports = { addProduct };
