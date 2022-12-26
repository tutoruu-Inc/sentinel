import { Resolvers } from "../generated/types";
import { coreResolvers } from "./core/resolvers.js";

export const resolvers: Resolvers = {
    ...coreResolvers,
    Query: {
        ...coreResolvers.Query,
    },
    Mutation: {
        ...coreResolvers.Mutation,
    },
};