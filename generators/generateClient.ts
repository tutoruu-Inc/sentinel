import { Mutation, Service, Query } from './fetchSchema.js';
import { parseField } from './generateGQLSchema.js';
import fs from 'fs/promises';

import { schema } from './fetchSchema.js';
const returnType = (fn: Mutation | Query, includeArr = true): string => {
  const { returnType } = fn;
  let name: string = returnType.name;
  if (name.includes('[')) {
    name = name.slice(1, name.length - 1);
    includeArr ? (name += '[]') : null;
  }
  name = name.replace('!', '');
  return name;
};
const functions = (
  fns: Query[] | Mutation[],
  type: 'query' | 'mutation' = 'query',
  authenticated?: boolean
): string => {
  return fns
    .map((query) => {
      const inputs = query.inputs && query.inputs.length > 0 ? true : false;
      return (
        `${query.name}: async <Q extends string>(query: Q${
          inputs
            ? `, ${query.inputs
                .map(
                  (i) =>
                    `${i.name}${i.required ? '' : '?'}: Types.${
                      i.baseType?.name
                        ? `Scalars['${i.baseType?.name}']`
                        : i.fieldType?.name
                    }`
                )
                .join(', ')}`
            : ''
        }${authenticated ? ', token?: string' : ''}) => {\n` +
        `type props = keyof {
          [Key in (String.Split<Q, ' '> extends (keyof Types.${returnType(
            query,
            false
          )})[]
            ? String.Split<Q, ' '>
            : never)[number]]: Types.${returnType(query, false)}[Key];
        }\n` +
        `return (await fetchGQL<{ ${query.name}: Pick<
         Types.${returnType(
           query,
           false
         )}, props extends never ? keyof Types.${returnType(
          query,
          false
        )} : props>${
          query.returnType.name.includes('[') ? '[]' : ''
        } }>(/* GraphQL */\`${type} ${
          query.name.charAt(0).toUpperCase() +
          query.name.slice(1) +
          type.charAt(0).toUpperCase() +
          type.slice(1)
        }${
          inputs
            ? `(${query.inputs
                .map((input) => '$' + parseField(input))
                .join(', ')})`
            : ''
        } {
        ${query.name}${
          inputs
            ? `(${query.inputs.map((i) => `${i.name}: $${i.name}`).join(', ')})`
            : ''
        } {
            \${query}
        }
    }\`, ${
      inputs ? `{ ${query.inputs.map((i) => i.name).join(', ')} }` : '{}'
    }` +
        `${authenticated ? ', { authorization: "Bearer " + token }' : ''}` +
        `)).${query.name}\n},\n`
      );
    })
    .join('');
};

const writeServiceForClient = async (service: Service) => {
  const { slug, objects } = service;

  const imports: string[] = [];
  imports.push(`import { fetchGQL } from "."`);
  imports.push(`import * as Types from "./generated/types.js"`);
  imports.push(`import { String } from 'ts-toolbelt';`);

  const queryString =
    'export const Queries = {\n' +
    functions(
      objects.map((object) => object.queries).flat(),
      'query',
      service.protected
    ) +
    '\n}\n';
  const MutationString =
    'export const Mutations = {\n' +
    functions(
      objects.map((object) => object.mutations).flat(),
      'mutation',
      service.protected
    ) +
    '\n}\n';

  await fs.writeFile(
    '../bridge/src/' + slug + '.ts',
    imports.join('\n') + '\n\n' + queryString + MutationString
  );
};
export const client = async (services: Service[] = schema.data.services) => {
  try {
    await fs.mkdir('../bridge/src/', { recursive: true });
  } catch (err) {
    console.error(err);
  }

  const index = `${services
    .map((s) => `export * as ${s.slug} from "./${s.slug}";\n`)
    .join('')}
  export const api_url = "https://sentinel-xtwfa.ondigitalocean.app/";
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
  `;
  await fs.writeFile('../bridge/src/index.ts', index);
  for (const service of services) await writeServiceForClient(service);
  try {
    await fs.rm('../bridge/src/generated', { recursive: true });
  } catch (err) {}
  try {
    await fs.mkdir('../bridge/src/generated', {
      recursive: true
    });
  } catch (err) {}
  try {
    const types = await fs.readFile('./generated/types.ts', 'utf-8');
    await fs.writeFile('../bridge/src/generated/types.ts', types);
  } catch (e) {
    console.error(e);
  }
};

import path from 'path';

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
