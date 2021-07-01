import express from "express";

export let puzzleRoutes = express.Router();


//PUZZLE 1
puzzleRoutes.route("/puzzle/merchant")
    .get(async (req, res) => {
        return res.status(200).send("todo");
    })
    .post(async (req, res) => {
        return res.status(200).send("todo");
    })


//PUZZLE 1
puzzleRoutes.route("/puzzle/makeitplace")
    .get(async (req, res) => {
        return res.status(200).send("todo");
    })
    .post(async (req, res) => {
        return res.status(200).send("todo");
    })


