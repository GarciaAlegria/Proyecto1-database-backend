const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    tipo: {
      type: String,
      required: true,
    },
    dpi: {
      type: String,
      required: false,
    },
    estado: {
      type: String,
      required: true,
    },
  },
  { collection: "users" },
);

module.exports = mongoose.model("User", userSchema);
