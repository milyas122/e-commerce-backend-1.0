const express = require("express");
const orderController = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/place", isAuth, orderController.placeOrder);
router.get("/", isAuth, orderController.getUserOrders);

module.exports = router;
