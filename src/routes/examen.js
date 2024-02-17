const express = require("express");
const examenSchema = require("../models/examen");

const router = express.Router();

router.get("/examenes/find", (req, res) => {
  examenSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/examenes/create", (req, res) => {
  const examen = new examenSchema(req.body);
  examen
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
