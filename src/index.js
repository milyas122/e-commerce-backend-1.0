const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const productRoutes = require("./routes/product-routes");

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/products", productRoutes);

// Db connect
mongoose
  .connect(
    "mongodb+srv://muhammadilyas:523221ali@nodejs-cluster.iu8pnvx.mongodb.net/e-commerce?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Connected");
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
