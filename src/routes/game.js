const express = require("express");
const gameSchema = require("../models/game");

const router = express.Router();

router.get("/games/find", (req, res) => {
  gameSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/games/create/:id", async (req, res) => {
  const game = new gameSchema(req.body);

  game
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
