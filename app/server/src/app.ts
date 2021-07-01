import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors"
import dotenv from "dotenv"


dotenv.config();

const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;
const PORT = process.env.PORT || 3000;
export let app = express();

app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(cors());

app.use(express.json({ limit: "300kb" }));
app.use(express.urlencoded({ extended: true, limit: "300kb" }));

import { isAuthenticated, isAdmin } from "./auth/auth";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import {puzzleRoutes} from "./routes/puzzle";
import {submitRoutes} from "./routes/submit"
import {leaderboardRoutes} from "./routes/leaderboard"
// Throw and show a stack trace on an unhandled Promise rejection instead of logging an unhelpful warning
process.on("unhandledRejection", err => {
    throw err;
});




app.use("/auth", authRoutes);

app.use("/submitEntry", isAdmin, submitRoutes);
app.use("/puzzle", isAdmin, puzzleRoutes);
app.use("/leaderboard", isAuthenticated, leaderboardRoutes);
app.use("/user", isAuthenticated, userRoutes);


app.use(isAuthenticated, express.static(path.join(__dirname, "../../client/build")));
app.get("*", isAuthenticated, (request, response) => {
    response.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`HackGT Puzzles 2021 system v${VERSION_NUMBER} started on port ${PORT}`);
});
