import { Mutation, Service, Query } from "./fetchSchema.js";
import { parseField } from "./generateGQLSchema.js";
import fs from "fs/promises";

import { schema } from "./fetchSchema.js";
const returnType = (fn: Mutation | Query, includeArr = true): string => {
  const { returnType } = fn;
  const { name, __typename } = returnType;
  let type: string = name;

  if (type.includes("[")) {
    type = type.slice(1, type.length - 1);
    if (__typename === "BaseType") type = `Scalars['${type}']`;
    else if (includeArr) return (type += "[]");
  } else if (__typename === "BaseType") {
    type = `Scalars['${type}']`;
    return type.replace("!", "");
  }
  return type.replace("!", "");
};

const functions = <FN extends Query | Mutation>(
  fns: FN[],
  type: "query" | "mutation" = "query",
  authenticated?: boolean
): string => {
  return fns
    .map((query) => {
      const inputs = query.inputs && query.inputs.length > 0 ? true : false;
      return (
        `export async function ${query.name}<Q extends string>(query: Q${
          inputs
            ? `, ${query.inputs
                .map(
                  (i) =>
                    `${i.name}${i.required ? "" : "?"}: Types.${
                      i.baseType?.name
                        ? `Scalars['${i.baseType?.name}']`
                        : i.fieldType?.name
                    }`
                )
                .join(", ")}`
            : ""
        }${authenticated ? ", token?: string" : ""}) {\n` +
        `return (await fetchGQL<{ ${query.name}: Query<
         Types.${returnType(query, false)}, Q>${
          query.returnType.name.includes("[") ? "[]" : ""
        } }>(/* GraphQL */\`${type} ${
          query.name.charAt(0).toUpperCase() +
          query.name.slice(1) +
          type.charAt(0).toUpperCase() +
          type.slice(1)
        }${
          inputs
            ? `(${query.inputs
                .map((input) => "$" + parseField(input))
                .join(", ")})`
            : ""
        } {
        ${query.name}${
          inputs
            ? `(${query.inputs.map((i) => `${i.name}: $${i.name}`).join(", ")})`
            : ""
        } {
            \${query}
        }
    }\`, ${
      inputs ? `{ ${query.inputs.map((i) => i.name).join(", ")} }` : "{}"
    }` +
        `${authenticated ? ', { authorization: "Bearer " + token }' : ""}` +
        `)).${query.name}\n}\n`
      );
    })
    .join("");
};

export const client = async (services: Service[] = schema.data.services) => {
  try {
    await fs.mkdir("../bridge/src/", { recursive: true });
  } catch (err) {
    console.error(err);
  }

  const index = `
  import * as Types from "./generated/types.js"
  import { String, List } from 'ts-toolbelt';

  export const api_url = "https://sentinel.tutoruu.com/";
  export async function fetchGQL<T>(
    query: string,
    variables: object | null = null,
    headers: object = {}
  ): Promise<T> {
    const res = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
    });
  
    const { data, errors } = await res.json();
  
    if (Array.isArray(errors)) errors.forEach((error) => console.log(error));
  
    return data;
  };

  type Query<T, Q extends string> = Pick<T, List.UnionOf<String.Split<Q, ' '>> extends keyof T ? List.UnionOf<String.Split<Q, ' '>> : keyof T>;

    ${services
      .map((s) =>
        functions(
          s.objects.map((object) => object.queries).flat(),
          "query",
          s.protected
        )
      )
      .filter((q) => !!q)
      .join("")}

    ${services
      .map((s) =>
        functions(
          s.objects.map((object) => object.mutations).flat(),
          "mutation",
          s.protected
        )
      )
      .filter((m) => !!m)
      .join("")}
  `;

  await fs.writeFile("../bridge/src/index.ts", index);
  try {
    await fs.rm("../bridge/src/generated", { recursive: true });
  } catch (err) {}
  try {
    await fs.mkdir("../bridge/src/generated", {
      recursive: true,
    });
  } catch (err) {}
  try {
    const types = await fs.readFile("./generated/types.ts", "utf-8");
    await fs.writeFile("../bridge/src/generated/types.ts", types);
  } catch (e) {
    console.error(e);
  }
};

import path from "path";

const copyRecursive = async (src: string, dest: string) => {
  var stats = await fs.stat(src);
  var isDirectory = stats.isDirectory();
  if (isDirectory) {
    await fs.mkdir(dest);
    const dir = await fs.readdir(src);
    dir.forEach(function (childItemName) {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
  }
};

client();
