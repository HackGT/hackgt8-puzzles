import express from "express";

export let userRoutes = express.Router();

userRoutes.route("/status").get(async (req, res) => {
        return res.status(200).send("todo");
});

  
