const express = require("express");
const axios = require("axios");
const playerSchema = require("../models/player");
const teamSchema = require("../models/team");

const router = express.Router();

router.get("/players/find", (req, res) => {
  playerSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/players/create/:id", async (req, res) => {
  const { id, team, ...bodyWithoutEmail } = playerDatos;
  const playerData = {
    ...bodyWithoutEmail,
    name: {
      first_name: bodyWithoutEmail.first_name,
      last_name: bodyWithoutEmail.last_name,
    },
    height: {
      height_feet: bodyWithoutEmail.height_feet,
      height_inches: bodyWithoutEmail.height_inches,
    },
    stats: valuesArray,
    team_id: teamPlayer._id,
  };
  const player = new playerSchema(playerData);

  console.log(player);

  player
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
