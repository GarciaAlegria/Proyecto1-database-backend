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

router.post("/teams/create", async (req, res) => {
  try {
    const teamsCount = await teamSchema.countDocuments();
    if (teamsCount >= 35) {
      return res.status(400).json({ message: "Se ha alcanzado el límite máximo de equipos" });
    }

    const team = new teamSchema(req.body);
    const savedTeam = await team.save();
    res.json(savedTeam);
  } catch (error) {
    console.error("Error al añadir equipo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/teams/find", (req, res) => {
  const { name } = req.query; 
  teamSchema
    .find({ name: { $regex: new RegExp(name, 'i') } }) 
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


router.delete("/teams/delete/:id", (req, res) => {
  const { id } = req.params;
  teamSchema
    .findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Equipo eliminado correctamente" });
    })
    .catch((error) => {
      console.log("Error deleting team:", error); // Agregar esta línea para ver el error en la consola del servidor
      res.status(500).json({ message: "Error interno del servidor" });
    });
});



module.exports = router;
