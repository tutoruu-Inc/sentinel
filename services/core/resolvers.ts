import { Resolvers } from "../../generated/types.js";

import {
  classResolvers,
  courseResolvers,
  userResolvers,
  universityResolvers,
  tutorResolvers,
} from "./index.js";

export const coreResolvers: Resolvers = {
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
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
