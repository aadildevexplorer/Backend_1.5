const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    expiresAt: {
    type: Date,
    required: true,
  },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userModel);
