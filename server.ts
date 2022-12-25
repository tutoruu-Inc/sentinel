import { ApolloServer, BaseContext } from "@apollo/server";
import fs from 'fs';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { Resolvers } from "./generated/types";

import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';

const resolvers: Resolvers = {};

const typesArray = fs.readdirSync('./schema').map((file) => { 
    return fs.readFileSync(`./schema/${file}`, 'utf8');
});
const typeDefs = mergeTypeDefs(typesArray)

const app = express();

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});
// Note you must call `server.start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Specify the path where we'd like to mount our server
app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

