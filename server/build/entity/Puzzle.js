"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Puzzle = void 0;
var database_1 = require("./database");
var PuzzleSchema = new database_1.mongoose.Schema({
    title: String,
    points: {
        type: Number,
        required: true
    },
    host: {
        type: String,
        unique: true,
        required: true
    },
    puzzle_id: {
        type: String,
        unique: true,
        required: true
    }
});
exports.Puzzle = database_1.mongoose.model("Puzzle", PuzzleSchema);
