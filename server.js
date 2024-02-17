const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/user.js");

//Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());
app.use("/api", userRoutes);

// Mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongodb atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log(`app listening on port ${port}`));
