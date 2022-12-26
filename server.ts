import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./services/resolvers.js";
import { typeDefs } from "./utils/stitch.js";

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

await startStandaloneServer(server, {
  listen: { port: 8000 },
});
