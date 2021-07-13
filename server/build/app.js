"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var VERSION_NUMBER = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../package.json"), "utf8")).version;
var PORT = process.env.PORT || 3000;
exports.app = express_1.default();
exports.app.use(morgan_1.default("dev"));
exports.app.use(compression_1.default());
exports.app.use(express_1.default.json());
exports.app.use(cors_1.default());
exports.app.use(express_1.default.json({ limit: "300kb" }));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: "300kb" }));
var auth_1 = require("./auth/auth");
var auth_2 = require("./routes/auth");
var user_1 = require("./routes/user");
var puzzle_1 = require("./routes/puzzle");
var submit_1 = require("./routes/submit");
var leaderboard_1 = require("./routes/leaderboard");
process.on("unhandledRejection", function (err) {
    throw err;
});
exports.app.use("/auth", auth_2.authRoutes);
exports.app.use("/submitEntry", auth_1.isAdmin, submit_1.submitRoutes);
exports.app.use("/puzzles", auth_1.isAdmin, puzzle_1.puzzleRoutes);
exports.app.use("/leaderboard", auth_1.isAuthenticated, leaderboard_1.leaderboardRoutes);
exports.app.use("/user", auth_1.isAuthenticated, user_1.userRoutes);
exports.app.use(auth_1.isAuthenticated, express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
exports.app.get("*", auth_1.isAuthenticated, function (request, response) {
    response.sendFile(path_1.default.join(__dirname, "../../client/dist", "index.html"));
});
exports.app.listen(PORT, function () {
    console.log("HackGT Puzzles 2021 system v" + VERSION_NUMBER + " started on port " + PORT);
});
