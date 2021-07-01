import { mongoose, RootDocument } from './database'
import { IPuzzle } from './Puzzle';

export interface IUser extends RootDocument {
    uuid: string;
    email: string;
    name: string;
    token: string;
    admin: boolean;
    points?: number;
    puzzlesCompleted: IPuzzleCompleted[];
    completed: boolean;
    finishDate?: Date;
}

export interface IPuzzleCompleted {
    puzzle: IPuzzle;
    date: Date;
}

export type IUserMongoose = IUser & mongoose.Document;

const PuzzleCompletedSchema = new mongoose.Schema({
    puzzle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Puzzle'
    },
    date: Date
})

const UserSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    token: String,
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
    puzzlesSolved: [PuzzleCompletedSchema],
    completed: Boolean,
    finishDate: Date
})

export const User = mongoose.model<IUserMongoose>("User", UserSchema);