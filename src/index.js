const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Middleware
app.use(express.json());

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
