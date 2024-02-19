const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new mongoose.Schema(
  {
    name: {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
    },
    position: {
      type: String,
      required: true,
    },
    height: {
      height_feet: {
        type: Number,
        required: true,
      },
      height_inches: {
        type: Number,
        required: true,
      },
    },
    weight_pounds: {
      type: Number,
      required: true,
    },
    stats: {
      type: Array,
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
