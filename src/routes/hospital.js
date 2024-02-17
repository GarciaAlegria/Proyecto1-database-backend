const express = require("express");
const hospitalSchema = require("../models/hospital");
const userSchema = require("../models/user");

const router = express.Router();

// consultar usuario
router.get("/hospitales", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/hospitales/create", async (req, res) => {
  const user = await userSchema.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Usuario no encontrado");
  }

  const { email, ...bodyWithoutEmail } = req.body;
  const hospitalData = { ...bodyWithoutEmail, user_id: user._id };
  const hospital = new hospitalSchema(hospitalData);
  hospital
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/hospitales/find", (req, res) => {
  const { zona } = req.body;
  hospitalSchema
    .find({ zona: zona })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put("/hospitales/update", (req, res) => {
  const { nombre, direccion } = req.body;
  hospitalSchema
    .updateOne({ nombre: nombre }, { direccion: direccion })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
