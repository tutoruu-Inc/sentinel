import { ScalarType, Service } from './fetchSchema.js';
import { scalars } from './generateScalars.js';
import { writeLaunchpad } from './writer.js';

export const generateLauncher = async (
  services: Service[],
  types: string[],
  scalarTypes: ScalarType[]
) => {
  let imports = `import { Resolvers } from "../generated/types.js";\nimport { GraphQLScalarType } from "graphql";`;
  const exprts =
    'export const typeDefs = /* GraphQL */`' + types.join('\n') + '`;\n';
  let resolvers =
    `export const resolvers: Resolvers = {\n` + scalars(scalarTypes);
  let queries = '\tQuery: {\n';
  let mutations = '\tMutation: {\n';
  for (const service of services) {
    imports += `import { ${service.name
      .replace(' ', '')
      .toLocaleUpperCase()} } from "./${service.slug}/service.js";\n`;
    resolvers += `\t...${service.name
      .replace(' ', '')
      .toLocaleUpperCase()}.resolvers,\n`;
    queries += `\t...${service.name
      .replace(' ', '')
      .toLocaleUpperCase()}.resolvers.Query,\n`;
    mutations += `\t...${service.name
      .replace(' ', '')
      .toLocaleUpperCase()}.resolvers.Mutation,\n`;
  }
  queries += '\t},\n';
  mutations += '\t},\n';

  await writeLaunchpad(
    imports + '\n' + resolvers + queries + mutations + '}\n\n' + exprts
  );
};
