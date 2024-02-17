const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hospitalSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    zona: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { collection: "hospitales" },
);

module.exports = mongoose.model("Hospital", hospitalSchema);
