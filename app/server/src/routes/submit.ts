import express from "express";
import { User, IUser, IPuzzleCompleted, IUserMongoose, IPuzzleCompletedMongoose } from '../entity/User';
import { Puzzle, IPuzzle } from '../entity/Puzzle'

export let submitRoutes = express.Router();

submitRoutes.route("/").post(async (req, res) => {
    /*
    Args:
        uuid
        puzzle_id
    */
    const uuid = req.body.uuid
    const puzzle_id = req.body.puzzle_id
    console.log(uuid)
    const user = await User.findOne({
        uuid: uuid
    });
    console.log(user)

    if(!user) {
        return res.send({
            success: false,
            error: 'There is no user with this uuid'
        })
    }

    const puzzle = await Puzzle.findOne({
        puzzle_id: puzzle_id
    })

    if(!puzzle) {
        return res.send({
            success: false,
            error: 'There is no puzzle with this puzzle_id'
        })
    }

    if(user?.puzzlesCompleted?.filter(obj => String(obj.puzzle._id) == String(puzzle._id)).length > 0) {
        return res.send({
            success: false,
            error: 'You have already submitted a solution!'
        })
    }

    const puzzleCompleted = {
        puzzle: puzzle,
        date: new Date()
    }

    user.puzzlesCompleted?.push(puzzleCompleted);
    user.points += puzzle.points;

    await user.save().then((user) =>{
        return res.send({success: true})
    }).catch((err) => {
        return res.send(
            { 
                success: false, 
                error: "There was an issue submitting. Try again."
            }
        )
    })


});

  
