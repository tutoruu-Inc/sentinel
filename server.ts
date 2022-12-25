import { ApolloServer, BaseContext } from "@apollo/server";
import fs from "fs";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { Resolvers } from "./generated/types";
import { startStandaloneServer } from "@apollo/server/standalone";

import { CoreAPI } from "./services/core/index.js";
import { queryable } from "./utils/Query.js";

const resolvers: Resolvers = {
  Query: {
    user: async (parent, args, context, info) =>
      await CoreAPI.getUser(args._id),
    users: async (_, args) =>
      await queryable(() => CoreAPI.getUsers(), args.input),
  },
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
