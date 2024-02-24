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

router.post("/players/find_specific", (req, res) => {
  playerSchema
    .find({ "name.first_name": req.body.name })
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

router.put("/players/update", async (req, res) => {
  let playerData = req.body;
  let beforeName = req.body.beforeName;

  if (req.body.newTeam !== "") {
    const teamPlayer = await teamSchema.findOne({ name: req.body.newTeam });
    if (!teamPlayer) {
      return res.status(400).send("Equipo no encontrado");
    }

    const { team, beforeName, ...restBody } = req.body;

    playerData = {
      ...restBody,
      team: teamPlayer._id,
    };
  } else {
    const { beforeName, ...restBody } = req.body;

    playerData = {
      ...restBody,
    };
  }

  const updateObject = {};
  // Update specific fields if needed
  updateObject.name = playerData.name;
  updateObject.position = playerData.position;
  updateObject.height = playerData.height;
  updateObject.weight_pounds = playerData.weight_pounds;
  updateObject.stats = playerData.stats;
  updateObject.team_id = playerData.team;

  // Update using the player's _id
  await playerSchema
    .findOneAndUpdate(
      { name: beforeName }, // Match using the unique identifier
      { $set: updateObject },
      { new: true }, // Return the updated document
    )
    .then(() => res.json({ message: "Player actualizado exitosamente" }))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
