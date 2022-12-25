import { CoreAPI } from "./index.js";
import { Course, FilterOperation, Resolvers } from "../../generated/types.js";
import { queryable } from "../../utils/Query.js";

export const tutorResolvers: Resolvers = {
  Query: {
    tutor: async (_, args) =>
      await CoreAPI.getTutor(
        args as { _id: string; email: string; username: string }
      ),
    tutors: async (_, args) =>
      await queryable(() => CoreAPI.getTutors(), args.input),
  },
  Tutor: {
    courses: async (parent) => {
      if (parent.courses.length === 0) return [];
      if (parent.courses[0]._id) return parent.courses;
      return (await CoreAPI.getCourses()).filter(({ _id }) =>
        parent.courses.includes(_id as unknown as Course)
      );
    },
  },
};
