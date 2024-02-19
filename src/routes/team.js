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

// Ruta para eliminar un equipo por su nombre
router.delete("/teams/delete/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const deletedTeam = await teamSchema.findOneAndDelete({ name: name });
    if (!deletedTeam) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.json({ message: "Equipo eliminado correctamente", deletedTeam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
