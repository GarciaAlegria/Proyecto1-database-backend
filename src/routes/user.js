const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

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

router.put("/users/update", (req, res) => {
  const { email, name } = req.body;
  userSchema
    .updateOne({ email: email }, { name: name })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
