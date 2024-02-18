const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
      required: true,
    },
    conference: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    arena: {
      type: String,
      required: true,
    },

    founded: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { collection: "equipos" },
);

module.exports = mongoose.model("Team", teamSchema);
