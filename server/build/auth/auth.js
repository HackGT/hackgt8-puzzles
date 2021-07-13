"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = require("../app");
var User_1 = require("../entity/User");
var strategies_1 = require("./strategies");
dotenv_1.default.config();
if (process.env.PRODUCTION === 'true') {
    app_1.app.enable("trust proxy");
}
else {
    console.warn("OAuth callback(s) running in development mode");
}
var session_secret = process.env.SECRET;
if (!session_secret) {
    throw new Error("Secret not specified");
}
app_1.app.use(session({
    secret: session_secret,
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app_1.app.use(passport.initialize());
app_1.app.use(passport.session());
function isAuthenticated(request, response, next) {
    response.setHeader("Cache-Control", "private");
    if (!request.isAuthenticated() || !request.user) {
        if (request.session) {
            request.session.returnTo = request.originalUrl;
        }
        response.redirect("/auth/login");
    }
    else {
        next();
    }
}
exports.isAuthenticated = isAuthenticated;
function isAdmin(request, response, next) {
    var user = request.user;
    var auth = request.headers.authorization;
    console.log('auth', auth);
    if (auth && typeof auth === "string" && auth.includes(" ")) {
        var origin = request.get('origin');
        var key = auth.split(" ")[1];
        if (key === process.env.ADMIN_KEY_SECRET) {
            next();
        }
        else {
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
    }
    else {
        if (user['admin'] == true) {
            next();
        }
        else {
            response.redirect('/auth/login');
        }
    }
}
exports.isAdmin = isAdmin;
var groundTruthStrategy = new strategies_1.GroundTruthStrategy(String(process.env.GROUND_TRUTH_URL));
passport.use(groundTruthStrategy);
passport.serializeUser(function (user, done) {
    done(null, user.uuid);
});
passport.deserializeUser(function (id, done) {
    User_1.User.findOne({ uuid: id }, function (err, user) {
        done(err, user);
    });
});
