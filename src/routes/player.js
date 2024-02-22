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

router.post("/players/create", async (req, res) => {
  const teamPlayer = await teamSchema.findOne({
    name: req.body.team,
  });
  if (!teamPlayer) {
    return res.status(400).send("Equipo no encontrado");
  }

  const newStats = req.body.stats.split(",").map(Number);

  console.log(newStats);

  const { stats, team, ...restBody } = req.body;

  const playerData = {
    ...restBody,
    stats: newStats,
    team: teamPlayer._id,
  };

  const player = new playerSchema(playerData);
  player
    .save()
    .then(() => res.json({ message: "Player agregado exitosamente" }))
    .catch((error) => res.json({ message: error }));
});

router.post("/players/delete", (req, res) => {
  console.log(req.body);
  console.log(req.body.name.first_name);
  console.log(req.body.name.last_name);
  playerSchema
    .deleteOne({
      name: {
        first_name: req.body.name.first_name,
        last_name: req.body.name.last_name,
      },
    })
    .then((data) => {
      if (data.deletedCount === 1) {
        res.json({ message: "Player deleted successfully" });
      } else {
        res.json({ message: "No player found with the given name" });
      }
    })
    .catch((error) => res.json({ message: error.message }));
});

module.exports = router;
