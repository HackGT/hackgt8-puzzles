import express from "express";

export let puzzleRoutes = express.Router();


puzzleRoutes.route("/add")
    .get(async (req, res) => {
        return res.status(200).send("todo");
    })


puzzleRoutes.route("/delete")
    .post(async (req, res) => {
        return res.status(200).send("todo");
    })

puzzleRoutes.route("/update")
    .post(async (req, res) => {
        return res.status(200).send("todo");
    })
