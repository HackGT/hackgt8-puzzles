import { mongoose, RootDocument } from './database'
import { IPuzzle } from './Puzzle';

export interface IPuzzleCompleted {
    puzzle: IPuzzle;
    date: Date;
}

export interface IUser extends RootDocument {
    uuid: string;
    email?: string;
    name: string;
    displayname: string;
    token: string;
    admin?: boolean;
    points: number;
    puzzlesCompleted: IPuzzleCompleted[];
    completed?: boolean;
    finishDate?: Date;
}

export type IUserMongoose = IUser & mongoose.Document;
export type IPuzzleCompletedMongoose = IPuzzleCompleted & mongoose.Document;

const PuzzleCompletedSchema = {
    puzzle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Puzzle',
        required: true
    },
    date: Date
}

const UserSchema = new mongoose.Schema({
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
},{
    usePushEach: true
})

export const User = mongoose.model<IUserMongoose>("User", UserSchema);
