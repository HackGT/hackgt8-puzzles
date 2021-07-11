import { IUser, User } from "entity/User";
import express from "express";

export let userRoutes = express.Router();


userRoutes.route("/status").get(async (req, res) => {
    //  query the user's object from req.user.id
    //  and return the object
    const user = req.user as IUser
    const user_info = await User.findById(user._id)
                                .select("name puzzlesCompleted points");
    res.send({success: false, user: user_info});
});

  
