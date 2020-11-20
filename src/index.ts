import {GraphQLServer} from 'graphql-yoga';
import {PrismaClient} from '@prisma/client';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Query from "./resolvers/Query";
import Movement from "./resolvers/Movement";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();
const resolvers = {
    Query,
    Mutation,
    User,
    Movement,
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        };
    },
});

server.start({
        port: PORT
    }, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    },
);
