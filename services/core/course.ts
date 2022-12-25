import { CoreAPI } from "./index.js";
import { Resolvers } from "../../generated/types.js";
import { queryable } from "../../utils/Query.js";

export const courseResolvers: Resolvers = {
  Query: {
    course: async (_, args) => await CoreAPI.getCourse(args._id),
    courses: async (_, args) =>
      await queryable(() => CoreAPI.getCourses(), args.input),
  },
  Course: {
    class: async (parent) => {
      if (parent.class?._id) return parent.class;
      return await CoreAPI.getClass(parent.class as unknown as string);
    },
  },
};
