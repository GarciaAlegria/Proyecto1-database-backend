const express = require("express");
const teamSchema = require("../models/team");

const router = express.Router();

// consultar equipo
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

router.put("/teams/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, abbreviation, conference, division, city, arena, founded, logo } = req.body;
  teamSchema
    .updateOne({_id: id }, { $set: { name, abbreviation, conference, division, city, arena, founded, logo }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


router.delete("/teams/deleteByName/:name", (req, res) => {
  const { name } = req.params;
  teamSchema
    .findOneAndRemove({ name: name })
    .then((data) => {
      if (data) {
        res.json({ message: "Equipo eliminado correctamente" });
      } else {
        res.json({ message: "No se encontró el equipo con ese nombre" });
      }
    })
    .catch((error) => res.json({ message: error }));
});


module.exports = router;
