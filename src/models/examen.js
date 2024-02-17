const mongoose = require("mongoose");

const examenSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imagenes: {
      type: String,
      required: true,
    },
  },
  { collection: "examenes" },
);

module.exports = mongoose.model("Examen", examenSchema);
