const express = require("express");
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
  // const team = await teamSchema.findOne({ name: req.body.email });
  // if (!team) {
  //   return res.status(400).send("Equipo no encontrado");
  // }

  // const { email, ...bodyWithoutEmail } = req.body;
  // const hospitalData = { ...bodyWithoutEmail, user_id: user._id };
  // const hospital = new hospitalSchema(hospitalData);
  const player = new playerSchema(req.body);
  player
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
