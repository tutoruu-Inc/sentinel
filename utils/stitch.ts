// import { mergeTypeDefs } from "@graphql-tools/merge";
// import fs from "fs";

// const typesArray = fs.readdirSync("./schema").map((file) => {
//     return fs.readFileSync(`./schema/${file}`, "utf8");
//   });
//   const typeDefs = mergeTypeDefs(typesArray);

import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
export const typeDefs = await loadSchema('./services/**/schema/*.graphql', { loaders: [new GraphQLFileLoader()] })

