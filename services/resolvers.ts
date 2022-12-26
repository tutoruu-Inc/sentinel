import { Resolvers } from "../generated/types";
import { coreResolvers } from "./core/resolvers.js";
import { authResolvers } from "./auth/index.js";

export const resolvers: Resolvers = {
    ...coreResolvers,
    ...authResolvers,
    Query: {
        ...coreResolvers.Query,
        ...authResolvers.Query,
    },
    Mutation: {
        ...coreResolvers.Mutation,
        ...authResolvers.Mutation,
    },
};