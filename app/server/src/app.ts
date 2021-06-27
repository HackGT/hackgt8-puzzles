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

import { isAuthenticated } from "./auth/auth";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";



// Throw and show a stack trace on an unhandled Promise rejection instead of logging an unhelpful warning
process.on("unhandledRejection", err => {
    throw err;
});


app.get("/status", (req, res) => {
    res.status(200).send("Success");
});


app.use("/auth", authRoutes);
app.use(isAuthenticated, express.static(path.join(__dirname, "../../client/build")));



app.get("/start", (req, res) => {
});



app.get("/puzzle", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../client/puzzles", "puzzle.md")

    );
});

app.post("/answer", (req, res) => {

});

app.get("*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../../client", "index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});



app.listen(PORT, () => {
    console.log(`HackGT Puzzles 2021 system v${VERSION_NUMBER} started on port ${PORT}`);
});
