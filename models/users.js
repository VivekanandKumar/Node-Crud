const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);