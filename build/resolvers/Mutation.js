"use strict";
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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var utils_1 = require("../utils");
function signup(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var password, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1.default.hash(args.password, 10)];
                case 1:
                    password = _a.sent();
                    return [4 /*yield*/, context.prisma.user.create({
                            data: __assign(__assign({}, args), { password: password }),
                        })];
                case 2:
                    user = _a.sent();
                    token = utils_1.APP_SECRET && jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
                    return [2 /*return*/, {
                            token: token,
                            user: user,
                        }];
            }
        });
    });
}
function login(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var user, valid, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.prisma.user.findOne({
                        where: { email: args.email },
                    })];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error('No such user found');
                    return [4 /*yield*/, bcryptjs_1.default.compare(args.password, user.password)];
                case 2:
                    valid = _a.sent();
                    if (!valid)
                        throw new Error('Invalid password');
                    token = utils_1.APP_SECRET && jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
                    return [2 /*return*/, {
                            token: token,
                            user: user,
                        }];
            }
        });
    });
}
function createAccount(parent, args, context, info) {
    var userId = utils_1.getUserId(context);
    return context.prisma.account.create({
        data: {
            accountType: args.accountType,
            statement: args.statement,
            availableValue: args.availableValue,
            client: { connect: { id: userId } },
        },
    });
}
function createMovement(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, accountId;
        return __generator(this, function (_a) {
            userId = utils_1.getUserId(context);
            accountId = +args.accountId;
            return [2 /*return*/, context.prisma.movement.create({
                    data: {
                        client: { connect: { id: userId } },
                        account: { connect: { id: accountId } },
                        description: args.description,
                        amount: args.amount,
                        type: args.type,
                    },
                })];
        });
    });
}
function updateMovement(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var movementId;
        return __generator(this, function (_a) {
            movementId = +args.movementId;
            return [2 /*return*/, context.prisma.movement.update({
                    where: {
                        id: movementId,
                    },
                    data: {
                        description: args.description,
                        type: args.type,
                        amount: +args.amount,
                    }
                })];
        });
    });
}
function deleteMovement(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var movementId;
        return __generator(this, function (_a) {
            movementId = +args.movementId;
            return [2 /*return*/, context.prisma.movement.delete({
                    where: {
                        id: movementId,
                    }
                })];
        });
    });
}
exports.default = {
    signup: signup,
    login: login,
    createAccount: createAccount,
    createMovement: createMovement,
    updateMovement: updateMovement,
    deleteMovement: deleteMovement,
};
