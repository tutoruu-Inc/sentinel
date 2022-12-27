// import Fuse from "fuse.js";
// import { filterByOperation, parseJSON } from "./parser.js";
// import { QueryOptions } from "../generated/types";

// class Query<T> {
//   query: QueryOptions;
//   data: T[];
//   total: number;

//   constructor(query: QueryOptions = {}, data: T[] = [], total: number = 0) {
//     this.query = query;
//     this.data = data;
//     this.total = total || data.length;
//   }

//   timebox() {
//     if (!this.query.timebox) return;

//     const {
//       created_after,
//       created_before,
//       updated_after,
//       updated_before,
//       create_prop,
//       update_prop,
//     } = this.query.timebox;

//       const created_date = (create_prop as keyof T) ?? "createdAt";
//       console.log({ length: this.data.filter(
//         (item) => new Date(item[created_date] as string) > new Date(created_after as string)
//       ).length})
//       if (created_after)
//         this.data = this.data.filter(
//           (item) => new Date(item[created_date] as string) > new Date(created_after)
//         );

//       if (created_before)
//         this.data = this.data.filter(
//           (item) => new Date(item[created_date] as string) < new Date(created_before)
//         );

//       const updated_date = (update_prop as keyof T) ?? "updatedAt";
//       if (updated_after)
//         this.data = this.data.filter(
//           (item) => new Date(item[updated_date] as string) > new Date(updated_after)
//         );
//       if (updated_before)
//         this.data = this.data.filter(
//           (item) => new Date(item[updated_date] as string) < new Date(updated_before)
//         );

//   }

//   filter() {
//     if (!this.query.filter) return;

//     const { function: fn, value, prop } = this.query.filter;

//     this.data = filterByOperation<T>(fn, this.data, prop, value);
//   }

//   search() {
//     if (!this.query.search) return;

//     const { value, paths, case_sensitive } = this.query.search;

//     const options = {
//       isCaseSensitive: !!case_sensitive,
//       includeScore: true,
//       includeMatches: true,
//       shouldSort: true,
//       keys: paths,
//     };

//     const fuse = new Fuse(this.data, options);
//     this.data = fuse.search(value).map((result) => {
//       return {
//         ...result.item,
//         score: result.score,
//         matches: result.matches,
//       };
//     });
//   }

//   sort() {
//     if (!this.query.sort) return;

//     const { prop, direction, function: fn } = this.query.sort;

//     const compareProp = (a: T, b: T) => {
//       let first;

//       let A, B;
//       A = a[prop as keyof T];
//       B = b[prop as keyof T];

//       if (!A || !B) return 0;

//       switch (fn) {
//         case "locale":
//           if (typeof A !== "string" || typeof B !== "string") return 0;
//           first = A.localeCompare(B);
//           break;
//         default:
//           first = (A as number) - (B as number);
//           break;
//       }

//       if (direction === "desc") first *= -1;
//       return first;
//     };

//     this.data = this.data.sort(compareProp);
//   }

//   paginate() {
//     if (!this.query.paginate) return;

//     let { limit, page } = this.query.paginate;

//     if (!limit) limit = this.data.length;
//     if (!page) page = 1;

//     const skip = (page - 1) * limit;
//     this.data = this.data.slice(skip, skip + limit);
//   }

//   apply(query = this.query, data = this.data) {
//     this.query = query;
//     this.data = data;
//     this.timebox();
//     this.filter();
//     this.search();
//     this.sort();
//     this.paginate();

//     return this;
//   }
// }

// export async function queryable<T>(
//   callback: () => Promise<T[]>,
//   query: QueryOptions | null | undefined
// ) {
//   const response = await callback();
//   if (!query) return response;

//   const q = new Query<T>(query, response);
//   return q.apply().data;
// }
