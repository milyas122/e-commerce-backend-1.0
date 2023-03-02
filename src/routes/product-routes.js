const express = require("express");
const productController = require("../controllers/product-controller");
const isAuth = require("../middleware/is-auth");
const isSeller = require("../middleware/is-seller");

const router = express.Router();

router.post("/add", isAuth, isSeller, productController.addProduct);
router.get("/:id", productController.getProduct);
router.put("/:id", isAuth, isSeller, productController.updateProduct);

module.exports = router;
