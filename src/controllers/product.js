const Product = require("../models/Product");

// GET: products/
async function getAllProducts(req, res) {
  const { page = 1 } = req.query;
  const limit = 2;
  try {
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // get total documents in the Products collection
    const count = await Product.countDocuments();

    return res.status(200).json({
      message: "Success",
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to get product detail" });
  }
}
// POST: products/add
async function addProduct(req, res) {
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

// GET: products/:id
async function getProduct(req, res) {
  const prodId = req.params.id;
  try {
    const product = await Product.findById({ _id: prodId });
    if (!product)
      return res
        .status(201)
        .json({ product: product, message: "Invalid Product Id" });
    return res.status(201).json({ product: product, message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to get product detail" });
  }
}

// PUT: products/:id
async function updateProduct(req, res) {
  const prodId = req.params.id;
  // const { title, price, stock, description, category, images } = req.body;

  try {
    let sellerId = await Product.findById({ _id: prodId }, "seller").lean();
    sellerId = sellerId.seller.toString();

    if (sellerId !== req.user.id)
      return res.status(400).json({ message: "Not allowed to updated it" });

    const product = await Product.findByIdAndUpdate(prodId, { ...req.body });

    if (!product)
      return res.status(500).json({ message: "Product Id is invalid" });

    return res.status(200).json({ product: product, message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to update product" });
  }
}

// delete product

module.exports = { addProduct, getProduct, updateProduct, getAllProducts };
