import express from "express";

export let submitRoutes = express.Router();

submitRoutes.route("/").get(async (req, res) => {
        return res.status(200).send("todo");
});

  
