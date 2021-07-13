"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.createNew = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
var MONGO_URL = String(process.env.MONGO_URL);
mongoose_1.default.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch(function (err) {
    throw err;
});
function createNew(model, doc) {
    return new model(doc);
}
exports.createNew = createNew;
