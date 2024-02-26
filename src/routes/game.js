const express = require("express");
const teamSchema = require("../models/team")
const gameSchema = require("../models/game");

const router = express.Router();

router.get("/games/find/:skip/:field/:order", (req, res) => {
  const { skip, field, order } = req.params;
  gameSchema.aggregate([
      {
        $lookup: {
          from: "equipos",
          localField: "home_team.team_id",
          foreignField: "_id",
          as: "home"
        }
      },
      {
        $lookup: {
          from: "equipos",
          localField: "visitor_team.team_id",
          foreignField: "_id",
          as: "visitor"
        }
      },
      { $unwind: "$home" },
      { $unwind: "$visitor" },
      {
        $project: {
          _id: "$_id",
          date: "$date",
          season: "$season",
          period: "$period",
          status: "$status",
          postseason: "$postseason",
          home_name: "$home.name",
          home_score: "$home_team.score",
          visitor_name: "$visitor.name",
          visitor_score: "$visitor_team.score",
        }
      },
    ]) 
    .sort({[field]: parseInt(order)})
    .skip(parseInt(skip))
    .limit(15)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/games/create", async (req, res) => {
  const { date, season, period, status, postseason, home_name, home_score, visitor_name, visitor_score } = req.body;

  const home = await teamSchema.findOne({name: home_name});
  const visitor = await teamSchema.findOne({name: visitor_name});

  if (gameSchema.countDocuments() + 1 > 50205) {
    res.json({message: "No se pueden agregar mas documentos."})
    return;
  }

  if(home && visitor) {
    const game = new gameSchema({
      date: date,
      season: season,
      period: period,
      status: status,
      postseason: postseason,
      home_team: {
        team_id: home._id,
        score: home_score
      },
      visitor_team: {
        team_id: visitor._id,
        score: visitor_score
      }
    });

    game
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } else {
    res.json({message: "El nombre del equipo local o visitante no existe."})
  }
});

router.put("/games/update", async (req, res) => {
  const { _id, date, season, period, status, postseason, home_name, home_score, visitor_name, visitor_score } = req.body;

  const home = await teamSchema.findOne({name: home_name});
  const visitor = await teamSchema.findOne({name: visitor_name});

  if(home && visitor) {
    gameSchema.updateOne(
    { _id: _id},
    { 
      $set: {
      date: date,
      season: season,
      period: period,
      status: status,
      postseason: postseason,
      home_team: {
        team_id: home._id,
        score: home_score
      },
      visitor_team: {
        team_id: visitor._id,
        score: visitor_score
      }
      }
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  }
});

router.delete("/games/delete/:id", (req, res) => {
  const { id } = req.params;
  gameSchema
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
