const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  age: Number,
  password: { type: String, required: true },
  img: { type: String },
  isAdmin: { type: Boolean, default: false }, 
});



const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
