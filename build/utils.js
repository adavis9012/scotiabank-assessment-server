"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRange = exports.getUserId = exports.APP_SECRET = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var APP_SECRET = process.env.APP_SECRET;
exports.APP_SECRET = APP_SECRET;
function getUserId(context) {
    var Authorization = context.request.get('Authorization');
    if (!APP_SECRET) {
        throw new Error('Misconfiguration');
    }
    if (Authorization) {
        var token = Authorization.replace('Bearer ', '');
        // @ts-ignore
        var userId = jsonwebtoken_1.default.verify(token, APP_SECRET).userId;
        return userId;
    }
    throw new Error('Not authenticated');
}
exports.getUserId = getUserId;
function replaceRange(text, end, substitute) {
    var count = text.length - end;
    return substitute.repeat(count) + text.substr(-end);
}
exports.replaceRange = replaceRange;
