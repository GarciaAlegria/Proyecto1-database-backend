const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    postseason: {
      type: Boolean,
      required: true,
    },
    home_team: {
      team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        require: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
    visitor_team: {
      team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        require: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  },
  { collection: "games" },
);

module.exports = mongoose.model("Game", gameSchema);
