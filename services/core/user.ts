import { CoreAPI } from "./index.js";
import { FilterOperation, Resolvers } from "../../generated/types.js";
import { queryable } from "../../utils/Query.js";

export const userResolvers: Resolvers = {
  Query: {
    user: async (_, args) =>
      await CoreAPI.getUser(
        args as { _id: string; email: string; username: string }
      ),
    users: async (_, args) =>
      await queryable(() => CoreAPI.getUsers(), args.input),
  },
  Mutation: {
    createUser: async (_, args) => await CoreAPI.createUser(args.input),
    updateUser: async (_, args) => await CoreAPI.updateUser(args._id, args.input),
    deleteUser: async (_, args) => await CoreAPI.deleteUser(args._id),
  },
  User: {
    classes: async (parent) => {
      if (parent.classes.length === 0) return [];
      if (parent.classes[0].name) return parent.classes;
      return await queryable(() => CoreAPI.getClasses(), {
        filter: {
          prop: "_id",
          function: FilterOperation.In,
          value: parent.classes.join("-"),
        },
      });
    },
    tutor: async (parent) => {
      if (!parent.tutor) return null;
      if (parent.tutor._id) return parent.tutor;
      return await CoreAPI.getTutor({
        _id: parent.tutor as unknown as string,
        username: "",
      });
    },
    university: async (parent) => {
      if (!parent.university?.abbrev)
        return await CoreAPI.getUniversity(
          parent.university as unknown as string
        );
      return parent.university;
    },
  },
};
