const express = require("express");
const productController = require("../controllers/product-controller");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/add", isAuth, productController.addProduct);

module.exports = router;
