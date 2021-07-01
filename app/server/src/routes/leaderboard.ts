import express from "express";
import { User, IUser } from '../entity/User';

export let leaderboardRoutes = express.Router();

leaderboardRoutes.route("/").get(async (req, res) => {
    const user = req.user as IUser
    console.log(user.uuid)
    return res.send({ success: true })
});

  
