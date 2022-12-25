import fs from "fs";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mergeTypeDefs } from "@graphql-tools/merge";

import { Resolvers } from "./generated/types.js";

import {
  classResolvers,
  courseResolvers,
  userResolvers,
  universityResolvers,
  tutorResolvers,
} from "./services/core/index.js";

const resolvers: Resolvers = {
  ...courseResolvers,
  ...classResolvers,
  ...universityResolvers,
  ...userResolvers,
  ...tutorResolvers,
  Query: {
    ...courseResolvers.Query,
    ...classResolvers.Query,
    ...universityResolvers.Query,
    ...userResolvers.Query,
    ...tutorResolvers.Query,
  }
};

const typesArray = fs.readdirSync("./schema").map((file) => {
  return fs.readFileSync(`./schema/${file}`, "utf8");
});
const typeDefs = mergeTypeDefs(typesArray);

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

await startStandaloneServer(server, {
  listen: { port: 8000 },
});
