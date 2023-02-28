const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isSeller: {
    type: Boolean,
    default: false,
  },
  city: String,
  phone: String,
  address: String,
  country: String,
  image: String,
  //   user cart
  //   user favorite products
});

const User = mongoose.model("User", userSchema);
module.exports = User;
