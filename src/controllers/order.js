const Cart = require("../models/Cart");
const Order = require("../models/Order");

// GET: /orders
async function getUserOrders(req, res) {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId });
    return res.status(200).json({ orders, message: "Success" });
  } catch (e) {
    console.log(e);
    return res.status(200).json({ message: "Error Occurred" });
  }
}

// POST: /orders/place
async function placeOrder(req, res) {
  const { cartIdList } = req.body;
  let orderCart,
    price,
    total = 0;
  try {
    let userCart = await Cart.find(
      { _id: { $in: cartIdList } },
      "productId, quantity -_id"
    )
      .populate({ path: "productId", select: "-stock -__v -seller" })
      .lean();

    userCart = userCart.map((cart) => {
      orderCart = { ...cart.productId, quantity: cart.quantity };
      price = parseFloat(orderCart.price);
      orderCart["price"] = price;
      orderCart["total"] = price * cart.quantity;
      orderCart["productId"] = orderCart["_id"];
      delete orderCart._id;
      total += orderCart.total;
      return orderCart;
    });
    // Implement a transaction here
    const placeOrder = await Order.create({
      userId: req.user.id,
      total,
      orderDetail: userCart,
    });

    await Cart.deleteMany({ _id: { $in: cartIdList } });

    return res.status(500).json({ placeOrder, message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = { placeOrder, getUserOrders };
