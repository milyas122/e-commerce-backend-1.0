const express = require("express");
const productController = require("../controllers/product-controller");
const isAuth = require("../middleware/is-auth");
const isSeller = require("../middleware/is-seller");

const router = express.Router();

router.post("/add", isAuth, isSeller, productController.addProduct);

module.exports = router;
