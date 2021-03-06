import express from "express";
import passport from "passport";
import {User, IUser} from '../entity/User';
export let userRoutes = express.Router();


userRoutes.route("/status").get(async (req, res) => {
       
        const uuid = req.user?.['uuid'];

        console.log(uuid);
        if (!uuid){
            return res.send({success: false, data: "uuid not specified"})
        }

        let user = await User.findOne({uuid: uuid}).select('name puzzlesCompleted points').populate('puzzlesCompleted.puzzle').exec(); 

        if (!user) {
            return res.send({success: false, data: "user not found"})
        }

        return res.send({success: true, data: {user}})
});

  
