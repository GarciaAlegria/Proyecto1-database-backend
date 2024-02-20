const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/user.js");
const teamRoutes = require("./src/routes/team.js");
const playerRoutes = require("./src/routes/player.js");
const gameRoutes = require("./src/routes/game.js");

app.use(cors({ origin: "http://localhost:3000" }));

//Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", teamRoutes);
app.use("/api", playerRoutes);
app.use("/api", gameRoutes);

// Mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongodb atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log(`app listening on port ${port}`));
