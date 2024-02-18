const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    heigh_feet: {
      type: Number,
      required: true,
    },
    heigh_inches: {
      type: Number,
      required: true,
    },
    weight_pounds: {
      type: Number,
      required: true,
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      require: true,
    },
  },
  { collection: "players" },
);

module.exports = mongoose.model("Player", playerSchema);
