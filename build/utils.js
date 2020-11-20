"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRange = exports.getUserId = exports.APP_SECRET = void 0;
var jwt = require('jsonwebtoken');
var APP_SECRET = process.env.APP_SECRET;
exports.APP_SECRET = APP_SECRET;
function getUserId(context) {
    var Authorization = context.request.get('Authorization');
    if (Authorization) {
        var token = Authorization.replace('Bearer ', '');
        var userId = jwt.verify(token, APP_SECRET).userId;
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
