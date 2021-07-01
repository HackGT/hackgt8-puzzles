import express from "express";

export let submitRoutes = express.Router();

submitRoutes.route("/").post(async (req, res) => {
        return res.status(200).send("todo");
});

  
