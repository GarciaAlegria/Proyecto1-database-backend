const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// consultar usuario
router.get("/users", (req, res) => {
  res.send("get user");
});

router.post("/users/create", (req, res) => {
  const user = new userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/users/find", (req, res) => {
  const { email } = req.body;
  userSchema
    .find({ email: email })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
