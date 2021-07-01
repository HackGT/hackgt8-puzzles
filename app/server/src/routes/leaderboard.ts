import express from "express";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import { User, IUser } from '../entity/User';

export let leaderboardRoutes = express.Router();

leaderboardRoutes.route("/").get(async (req, res) => {
    const usersSorted = await User.find(
        {
            points: {
                $gt: 0
            }
        }, 
        {},
        {
            sort: {
                points: -1
            }
        }
    ).select('name points')
    console.log(usersSorted)
    return res.send({ success: true, data: {
        users: usersSorted
    }});
});

  
