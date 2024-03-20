// models/user.js
const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ProjectUser", User);
