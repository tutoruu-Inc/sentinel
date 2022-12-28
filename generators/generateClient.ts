import { Mutation, Service, Query } from './fetchSchema.js';
import { parseField } from './generateGQLSchema.js';
import fs from 'fs/promises';

import { schema } from './fetchSchema.js';
const functions = (fns: Query[] | Mutation[]): string => {
  return fns
    .map((query) => {
      const inputs = query.inputs && query.inputs.length > 0 ? true : false;
      return (
        `${query.name}: async (query: string${
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
        }) => {\n` +
        `return await fetchGQL(\`query Query${
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
    }\`${inputs ? `, { ${query.inputs.map((i) => i.name).join(', ')} }` : ''}` +
        `)\n},\n`
      );
    })
    .join('');
};

const writeServiceForClient = async (service: Service) => {
  const { slug, objects } = service;

  const imports: string[] = [];
  imports.push(`import { fetchGQL } from "."`);
  imports.push(`import * as Types from "./generated/types.js"`);

  const queryString =
    'export const Queries = {\n' +
    functions(objects.map((object) => object.queries).flat()) +
    '\n}\n';
  const MutationString =
    'export const Mutations = {\n' +
    functions(objects.map((object) => object.mutations).flat()) +
    '\n}\n';

  await fs.writeFile(
    './@tutoruu-inc/sentinel/src/' + slug + '.ts',
    imports.join('\n') + '\n\n' + queryString + MutationString
  );
};
export const client = async (services: Service[] = schema.data.services) => {
  try {
    await fs.mkdir('./@tutoruu-inc/sentinel/src/', { recursive: true });
  } catch (err) {
    console.error(err);
  }

  const index = `${services
    .map((s) => `export * as ${s.slug} from "./${s.slug}";\n`)
    .join('')}
  export const api_url = "https://sentinel-xtwfa.ondigitalocean.app/";
  export const fetchGQL = async (
    query: string,
    variables: object | null = null,
    headers: object = {}
  ) => {
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
  await fs.writeFile('./@tutoruu-inc/sentinel/src/index.ts', index);
  for (const service of services) await writeServiceForClient(service);
  await copyRecursive('./generated', './@tutoruu-inc/sentinel/src/generated');
};

import path from 'path';

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
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
    fs.copyFile(src, dest);
  }
};

client();
