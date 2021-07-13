import mongoose = require("mongoose");
import express = require("express");
import passport = require("passport");
import session = require("express-session");
const MongoStore = require('connect-mongo')(session);
import dotenv from "dotenv"
import { app } from "../app";
import { IUser, User } from "../entity/User";
import { GroundTruthStrategy } from "./strategies";

dotenv.config();

if (process.env.PRODUCTION === 'true') {
    app.enable("trust proxy");
}
else {
    console.warn("OAuth callback(s) running in development mode");
}

const session_secret = process.env.SECRET;
if (!session_secret) {
    throw new Error("Secret not specified");
}

app.use(session({
    secret: session_secret,
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());

export function isAuthenticated(request: express.Request, response: express.Response, next: express.NextFunction): void {
    response.setHeader("Cache-Control", "private");
    if (!request.isAuthenticated() || !request.user) {
        if (request.session) {
            request.session.returnTo = request.originalUrl;
        }
        response.redirect("/auth/login");
    } else {
        next();
    }
}


export function isAdmin(request: express.Request, response: express.Response, next: express.NextFunction): void {
    const user = request.user as IUser;
    const auth = request.headers.authorization;
    console.log('auth',auth)
    if (auth && typeof auth === "string" && auth.includes(" ")) {
        var origin = request.get('origin');
        const key = auth.split(" ")[1];
        if (key === process.env.ADMIN_KEY_SECRET) {
            next();
        } else {
            response.status(401).json({
            error: "Incorrect auth token",
            });
        }
    }
    else if (!request.isAuthenticated() || !user) {
        if (request.session) {
            request.session.returnTo = request.originalUrl;
        }
        response.redirect("/auth/login");
    } else {
        if (user['admin']==true) {
            next();
        } else {
            response.redirect('/auth/login');
        }
    }
}

const groundTruthStrategy = new GroundTruthStrategy(String(process.env.GROUND_TRUTH_URL));

passport.use(groundTruthStrategy);
passport.serializeUser<IUser, string>((user, done) => {
    done(null, user.uuid);
});
passport.deserializeUser<IUser, string>((id, done) => {
    User.findOne({ uuid: id }, (err, user) => {
        done(err, user!);
    });
});
