import { CoreAPI } from "./index.js";
import { Resolvers } from "../../generated/types.js";
import { queryable } from "../../utils/Query.js";

export const universityResolvers: Resolvers = {
  Query: {
    university: async (_, args) => await CoreAPI.getUniversity(args._id),
    universities: async (_, args) =>
      await queryable(() => CoreAPI.getUniversities(), args.input),
  },
};
