import { mongoose, RootDocument } from './database';

export interface IPuzzle extends RootDocument {
    title: string;
    points: number;
    host: string;
    puzzle_id: string; //index on this
}

export type IPuzzleMongoose = IPuzzle & mongoose.Document;

const PuzzleSchema = new mongoose.Schema({
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
})

export const Puzzle = mongoose.model<IPuzzleMongoose>("Puzzle", PuzzleSchema);
