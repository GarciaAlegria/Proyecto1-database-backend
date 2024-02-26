const express = require("express");
const axios = require("axios");
const playerSchema = require("../models/player");
const teamSchema = require("../models/team");

const router = express.Router();

router.post("/players/find", async (req, res) => {
  try {
    const players = await playerSchema.aggregate([
      {
        $lookup: {
          from: "equipos", // Collection name of the teams
          localField: "team_id",
          foreignField: "_id",
          as: "team",
        },
      },
      {
        $unwind: "$team",
      },
      {
        $project: {
          name: "$name",
          height: "$height",
          position: "$position",
          weight_pounds: "$weight_pounds",
          stats: "$stats",
          team_name: "$team.name",
          averagePoints: { $arrayElemAt: ["$stats", 18] },
        },
      },
      {
        $sort: { [req.body.sort]: req.body.num },
      },
    ]);

    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching players" });
  }
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

  const { stats, team, newTeam, ...restBody } = req.body;

  const playerData = {
    ...restBody,
    stats: newStats,
    team_id: teamPlayer._id,
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

/* PLAYER STATS */

router.get("/players/find/averagePoints", async (req, res) => {
  try {
    const players = await playerSchema.aggregate([
      {
        $project: {
          gamesPlayed: { $arrayElemAt: ["$stats", 0] },
          fieldGoalsMade: { $arrayElemAt: ["$stats", 4] },
          fieldGoalsAttempted: { $arrayElemAt: ["$stats", 5] },
          freethrowsPerGame: { $arrayElemAt: ["$stats", 8] },
          reboundsPerGame: { $arrayElemAt: ["$stats", 12] },
          assistsPerGame: { $arrayElemAt: ["$stats", 13] },
          personalFouls: { $arrayElemAt: ["$stats", 13] },
          stealsPerGame: { $arrayElemAt: ["$stats", 14] },
          blocksPerGame: { $arrayElemAt: ["$stats", 15] },
          turnoversPerGame: { $arrayElemAt: ["$stats", 16] },
          pointsAverage: { $arrayElemAt: ["$stats", 18] },
          fieldGoalPct: { $arrayElemAt: ["$stats", 19] },
          fieldGoal3Pct: { $arrayElemAt: ["$stats", 20] },
          freeThrowPct: { $arrayElemAt: ["$stats", 21] },
        },
      },
      {
        $match: { gamesPlayed: { $gt: 0 } },
      },
      {
        $group: {
          _id: null,
          averageGamesPlayed: { $avg: "$gamesPlayed" },
          averageFGM: { $avg: "$fieldGoalsMade" },
          averageFGA: { $avg: "$fieldGoalsAttempted" },
          averageFT: { $avg: "$freethrowsPerGame" },
          averageRebound: { $avg: "$reboundsPerGame" },
          averageAssist: { $avg: "$assistsPerGame" },
          averagePF: { $avg: "$personalFouls" },
          averageSteals: { $avg: "$stealsPerGame" },
          averageBlocks: { $avg: "$blocksPerGame" },
          averageTurnovers: { $avg: "$turnoversPerGame" },
          averagePoints: { $avg: "$pointsAverage" },
          averageFGP: { $avg: "$fieldGoalPct" },
          averageFG3P: { $avg: "$fieldGoal3Pct" },
          averageFTP: { $avg: "$freeThrowPct" },
        },
      },
    ]);

    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching players" });
  }
});

module.exports = router;
