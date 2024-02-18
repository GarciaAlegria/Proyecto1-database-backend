const express = require("express");
const teamSchema = require("../models/team");

const router = express.Router();

// consultar usuario
router.get("/teams", (req, res) => {
  teamSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/teams/create", (req, res) => {
  const team = new teamSchema(req.body);
  team
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/teams/find", (req, res) => {
  const { name } = req.body;
  teamSchema
    .find({ name: name })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put("/teams/update", (req, res) => {
  const { nombre, direccion } = req.body;
  teamSchema
    .updateOne({ nombre: nombre }, { direccion: direccion })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
