"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = void 0;
var isValidUrl = function (url) {
    try {
        new URL(url);
    }
    catch (e) {
        console.error(e);
        return false;
    }
    return true;
};
exports.isValidUrl = isValidUrl;
