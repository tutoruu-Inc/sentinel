import fs from "fs/promises";
export const writeService = async (
  name: string,
  schema: string,
  api: string
) => {
  try {
    await fs.rm(`./services/${name}`, { recursive: true });
  } catch (err) {
    const error = err satisfies unknown as { code: string; errno: number };
    if (error.code !== "ENOENT") {
      console.error(err);
      return false;
    }
  }
  try {
    await fs.mkdir(`./services/${name}`, { recursive: true });
    await fs.writeFile(`./services/${name}/schema.graphql`, schema);
    await fs.writeFile(`./services/${name}/service.ts`, api);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

export const writeLaunchpad = async (script: string) => {
  await fs.writeFile("./services/launchpad.ts", script);
};

export const writeSchema = async (schema: string) => {
  try {
    await fs.writeFile("./services/schema.graphql", schema);
  } catch (err) {
    const error = err satisfies unknown as { code: string; errno: number };
    if (error.code !== "ENOENT") {
      console.error(err);
      return false;
    }
    try {
      await fs.mkdir("./services");
    } catch (err) {}
    await fs.writeFile("./services/schema.graphql", schema);
  }
};
export const writeServer = async () => {
  await fs.writeFile(
    "./server.ts",
    `import { ApolloServer, BaseContext } from "@apollo/server";\n` +
      `import { startStandaloneServer } from "@apollo/server/standalone";\n\n` +
      `import { resolvers, typeDefs } from "./services/launchpad.js";\n\n` +
      `const server = new ApolloServer<BaseContext>({ typeDefs, resolvers });\n\n` +
      `const port = process.env.PORT ?? "8000" as string;\n` +
      `await startStandaloneServer(server, { listen: { port } });\n\n` +
      `console.log("Sentinel up and running...")\n`
  );
};
export const writeUtils = async () => {
  try {
    await fs.mkdir("./utils");
  } catch (err) {}
  await fs.writeFile(
    "./utils/Query.ts",
    `import Fuse from "fuse.js";
    import { filterByOperation } from "./parser.js";
    import { QueryOptions } from "../generated/types.js";
    
    class Query<T> {
      query: QueryOptions;
      data: T[];
      total: number;
    
      constructor(query: QueryOptions = {}, data: T[] = [], total: number = 0) {
        this.query = query;
        this.data = data;
        this.total = total || data.length;
      }
    
      timebox() {
        if (!this.query.timebox) return;
    
        const {
          created_after,
          created_before,
          updated_after,
          updated_before,
          create_prop,
          update_prop,
        } = this.query.timebox;
    
          const created_date = (create_prop as keyof T) ?? "createdAt";
          console.log({ length: this.data.filter(
            (item) => new Date(item[created_date] as string) > new Date(created_after as string)
          ).length})
          if (created_after)
            this.data = this.data.filter(
              (item) => new Date(item[created_date] as string) > new Date(created_after)
            );
    
          if (created_before)
            this.data = this.data.filter(
              (item) => new Date(item[created_date] as string) < new Date(created_before)
            );
    
          const updated_date = (update_prop as keyof T) ?? "updatedAt";
          if (updated_after)
            this.data = this.data.filter(
              (item) => new Date(item[updated_date] as string) > new Date(updated_after)
            );
          if (updated_before)
            this.data = this.data.filter(
              (item) => new Date(item[updated_date] as string) < new Date(updated_before)
            );
    
      }
    
      filter() {
        if (!this.query.filter) return;
    
        const { function: fn, value, prop } = this.query.filter;
    
        this.data = filterByOperation<T>(fn, this.data, prop, value);
      }
    
      search() {
        if (!this.query.search) return;
    
        const { value, paths, case_sensitive } = this.query.search;
    
        const options = {
          isCaseSensitive: !!case_sensitive,
          includeScore: true,
          includeMatches: true,
          shouldSort: true,
          keys: paths,
        };
    
        const fuse = new Fuse(this.data, options);
        this.data = fuse.search(value).map((result) => {
          return {
            ...result.item,
            score: result.score,
            matches: result.matches,
          };
        });
      }
    
      sort() {
        if (!this.query.sort) return;
    
        const { prop, direction, function: fn } = this.query.sort;
    
        const compareProp = (a: T, b: T) => {
          let first;
    
          let A, B;
          A = a[prop as keyof T];
          B = b[prop as keyof T];
    
          if (!A || !B) return 0;
    
          switch (fn) {
            case "locale":
              if (typeof A !== "string" || typeof B !== "string") return 0;
              first = A.localeCompare(B);
              break;
            default:
              first = (A as number) - (B as number);
              break;
          }
    
          if (direction === "desc") first *= -1;
          return first;
        };
    
        this.data = this.data.sort(compareProp);
      }
    
      paginate() {
        if (!this.query.paginate) return;
    
        let { limit, page } = this.query.paginate;
    
        if (!limit) limit = this.data.length;
        if (!page) page = 1;
    
        const skip = (page - 1) * limit;
        this.data = this.data.slice(skip, skip + limit);
      }
    
      apply(query = this.query, data = this.data) {
        this.query = query;
        this.data = data;
        this.timebox();
        this.filter();
        this.search();
        this.sort();
        this.paginate();
    
        return this;
      }
    }
    
    export async function queryable<T>(
      callback: () => Promise<T[]>,
      query: QueryOptions | null | undefined
    ) {
      const response = await callback();
      if (!query) return response;
    
      const q = new Query<T>(query, response);
      return q.apply().data;
    }
    `
  );

  await fs.writeFile(
    "./utils/parser.ts",
    `import { FilterOperation } from "../generated/types.js";

    export function filterByOperation<T>(
      operation: FilterOperation,
      data: T[],
      key: string,
      value: string
    ) {
      function assertOperation(
        operation: FilterOperation,
        data: T,
        value: string
      ): boolean {
        let item;
    
        const path = key.split(".");
        if (path.length > 1) {
          let iterator = data;
          for (let i = 0; i < path.length; i++)
            iterator = iterator[path[i] as keyof typeof item];
    
          item = iterator;
        } else item = data[key as keyof typeof data];
    
        switch (operation) {
          case "gt":
            return item > value;
          case "lt":
            return item < value;
          case "gte":
            return item >= value;
          case "lte":
            return item >= value;
          case "eq":
            return item == value;
          case "neq":
            return item != value;
          case "in":
            return (
              (!Array.isArray(item) && typeof item !== "string") ||
              item.includes(value)
            );
          case "nin":
            return (
              (!Array.isArray(item) && typeof item !== "string") ||
              !item.includes(value)
            );
          default:
            return false;
        }
      }
    
      return data.filter((item) => assertOperation(operation, item, value));
    }
    `
  );
};
