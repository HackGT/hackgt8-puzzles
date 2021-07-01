import express from "express";
import { isValidUrl } from '../utils'
import { Puzzle, IPuzzle } from '../entity/Puzzle'

export let puzzleRoutes = express.Router();

puzzleRoutes.route("/")
    .get(async (req, res) => {
        await Puzzle.find({}, req.body).then(obj => {
            return res.send({success: true, data: obj});
        }).catch(err => {
            return res.send({success: false, error: "There was a problem getting your puzzles!"})
        });
    })

puzzleRoutes.route("/:id")
    .get(async (req, res) => {
        const _id = req.params.id;
        await Puzzle.findById(_id, req.body).then(obj => {
            return res.send({success: true, data: obj});
        }).catch(err => {
            return res.send({success: false, error: "There was a problem getting your puzzle!"})
        });
    })

puzzleRoutes.route("/")
    .post(async (req, res) => {
        const title = req.body.title;
        const puzzle_id = req.body.puzzle_id;
        const points = req.body.points;
        const host = req.body.host;

        if(!title) {
            return res.send({ success: false, error: "Title not defined"})
        }
        if(!puzzle_id) {
            return res.send({ success: false, error: "puzzle_id not defined"})
        }
        if(!points) {
            return res.send({ success: false, error: "Points not defined"})
        }
        if(!host) {
            return res.send({ success: false, error: "Host not defined"})
        }

        if(!isValidUrl(host)) {
            return res.send({ success: false, error: "Host url is not valid"})
        }

        const puzzle = {
            title,
            puzzle_id,
            points,
            host
        }

        await Puzzle.create(puzzle).then(obj => {
            return res.send({success: true, data: obj});
        }).catch(err => {
            return res.send({success: false, error: "There was a problem creating your puzzle! Make sure this is not a duplicate puzzle :)"})
        });
    })


puzzleRoutes.route("/:id")
    .delete(async (req, res) => {
        const _id = req.params.id;
        await Puzzle.findByIdAndDelete(_id).then(obj => {
            return res.send({success: true, data: obj});
        }).catch(err => {
            return res.send({success: false, error: "There was a problem deleting your puzzle!"})
        });
    })

puzzleRoutes.route("/:id")
    .patch(async (req, res) => {
        const _id = req.params.id;
        await Puzzle.findByIdAndUpdate(_id, {
            $set: {
                ...req.body
            }
        }).then(obj => {
            return res.send({success: true, data: obj});
        }).catch(err => {
            return res.send({success: false, error: "There was a problem deleting your puzzle!"})
        });
    })
