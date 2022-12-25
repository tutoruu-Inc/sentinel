import { CoreAPI } from "./index.js";
import { FilterOperation, Resolvers } from "../../generated/types.js";
import { queryable } from "../../utils/Query.js";

export const classResolvers: Resolvers = {
  Query: {
    class: async (_, args) => await CoreAPI.getClass(args._id),
    classes: async (_, args) =>
      await queryable(() => CoreAPI.getClasses(), args.input),
  },
  Class: {
    courses: async (parent) =>
      await queryable(() => CoreAPI.getCourses(), {
        filter: {
          prop: "class",
          function: FilterOperation.Eq,
          value: parent._id,
        },
      }),
  },
};
