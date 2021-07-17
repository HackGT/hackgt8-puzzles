"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var database_1 = require("./database");
var PuzzleCompletedSchema = {
    puzzle: {
        type: database_1.mongoose.Schema.Types.ObjectId,
        ref: 'Puzzle',
        required: true,
        unique: true
    },
    date: Date
};
var UserSchema = new database_1.mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    token: String,
    displayname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: Boolean,
    puzzlesCompleted: {
        type: [PuzzleCompletedSchema],
        default: []
    },
    points: {
        type: Number,
        required: false,
        index: true,
        default: 0
    },
    completed: Boolean,
    finishDate: Date
}, {
    usePushEach: true
});
exports.User = database_1.mongoose.model("User", UserSchema);
