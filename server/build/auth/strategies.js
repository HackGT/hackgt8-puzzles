"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLink = exports.GroundTruthStrategy = void 0;
var url_1 = require("url");
var passport_oauth2_1 = require("passport-oauth2");
var dotenv_1 = __importDefault(require("dotenv"));
var User_1 = require("../entity/User");
var database_1 = require("../entity/database");
dotenv_1.default.config();
var GroundTruthStrategy = (function (_super) {
    __extends(GroundTruthStrategy, _super);
    function GroundTruthStrategy(url) {
        var _this = this;
        var secret = (process.env.GROUND_TRUTH_SECRET);
        var id = (process.env.GROUND_TRUTH_ID);
        if (!secret || !id) {
            throw new Error("Client ID or secret not configured in environment variables for Ground Truth");
        }
        var options = {
            authorizationURL: new url_1.URL("/oauth/authorize", url).toString(),
            tokenURL: new url_1.URL("/oauth/token", url).toString(),
            clientID: id,
            clientSecret: secret,
            passReqToCallback: true
        };
        _this = _super.call(this, options, GroundTruthStrategy.passportCallback) || this;
        _this.url = url;
        return _this;
    }
    GroundTruthStrategy.prototype.userProfile = function (accessToken, done) {
        this._oauth2._request("GET", new url_1.URL("/api/user", this.url).toString(), null, null, accessToken, function (err, data) {
            if (err) {
                done(err);
                return;
            }
            try {
                var profile = __assign(__assign({}, JSON.parse(data)), { token: accessToken });
                done(null, profile);
            }
            catch (err) {
                return done(err);
            }
        });
    };
    GroundTruthStrategy.passportCallback = function (req, accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function () {
            var query, variables, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n                query($search: String!) {\n                    search_user(search: $search, offset: 0, n: 1) {\n                        users {\n                            confirmed\n                        }\n                    }\n                }\n            ";
                        variables = {
                            search: profile.email
                        };
                        return [4, User_1.User.findOne({ uuid: profile.uuid })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            user = database_1.createNew(User_1.User, __assign(__assign({}, profile), { points: 0, puzzlesCompleted: [], admin: false }));
                        }
                        else {
                            user.token = accessToken;
                        }
                        return [4, user.save()];
                    case 2:
                        _a.sent();
                        done(null, user);
                        return [2];
                }
            });
        });
    };
    return GroundTruthStrategy;
}(passport_oauth2_1.Strategy));
exports.GroundTruthStrategy = GroundTruthStrategy;
function getExternalPort(req) {
    function defaultPort() {
        return req.protocol === "http" ? 80 : 443;
    }
    var host = req.headers.host;
    if (!host || Array.isArray(host)) {
        return defaultPort();
    }
    var offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
    var index = host.indexOf(":", offset);
    if (index !== -1) {
        return parseInt(host.substring(index + 1), 10);
    }
    else {
        return defaultPort();
    }
}
function createLink(req, link) {
    if (link[0] === "/") {
        link = link.substring(1);
    }
    if ((req.secure && getExternalPort(req) === 443) || (!req.secure && getExternalPort(req) === 80)) {
        return "http" + (req.secure ? "s" : "") + "://" + req.hostname + "/" + link;
    }
    else {
        return "http" + (req.secure ? "s" : "") + "://" + req.hostname + ":" + getExternalPort(req) + "/" + link;
    }
}
exports.createLink = createLink;
