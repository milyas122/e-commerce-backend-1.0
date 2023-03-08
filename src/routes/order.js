const express = require("express");
const orderController = require("../controllers/order");

const router = express.Router();

router.post("/place", orderController.placeOrder);

module.exports = router;
