const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const favoriteRoutes = require("./routes/favorite");
const cartRoutes = require("./routes/cart");
const orderRoute = require("./routes/order");

const app = express();
const port = config.get("PORT");
const dbURI = config.get("DB_URI");

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoute);

// Db connect
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("DB Connected");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
