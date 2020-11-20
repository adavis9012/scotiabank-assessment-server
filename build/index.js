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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var client_1 = require("@prisma/client");
var Mutation_1 = __importDefault(require("./resolvers/Mutation"));
var User_1 = __importDefault(require("./resolvers/User"));
var Query_1 = __importDefault(require("./resolvers/Query"));
var Movement_1 = __importDefault(require("./resolvers/Movement"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT || 4000;
var prisma = new client_1.PrismaClient();
var resolvers = {
    Query: Query_1.default,
    Mutation: Mutation_1.default,
    User: User_1.default,
    Movement: Movement_1.default,
};
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: resolvers,
    context: function (request) {
        return __assign(__assign({}, request), { prisma: prisma });
    },
});
server.start({
    port: PORT
}, function () {
    console.log("Server is running on port http://localhost:" + PORT);
});
