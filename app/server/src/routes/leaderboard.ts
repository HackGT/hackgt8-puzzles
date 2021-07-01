import express from "express";

export let leaderboardRoutes = express.Router();

leaderboardRoutes.route("/").get(async (req, res) => {
        return res.status(200).send("todo");
});

  
