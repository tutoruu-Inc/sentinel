import { Service } from './fetchSchema.js';
import { writeLaunchpad, writeServer } from './writer.js';

export const generateLauncher = async (
  services: Service[],
  types: string[]
) => {
  let imports = `import { Resolvers } from "../generated/types.js";\n`;
  const exports =
    'export const typeDefs = /* GraphQL */`' + types.join('\n') + '`;\n';
  let resolvers = `export const resolvers: Resolvers = {\n`;
  let queries = '\tQuery: {\n';
  let mutations = '\tMutation: {\n';
  for (const service of services) {
    imports += `import { ${service.name.toLocaleUpperCase()} } from "./${
      service.slug
    }/service.js";\n`;
    resolvers += `\t...${service.name.toLocaleUpperCase()}.resolvers,\n`;
    queries += `\t...${service.name.toLocaleUpperCase()}.resolvers.Query,\n`;
    mutations += `\t...${service.name.toLocaleUpperCase()}.resolvers.Mutation,\n`;
  }
  queries += '\t},\n';
  mutations += '\t},\n';

  const script =
    imports + '\n' + resolvers + queries + mutations + '}\n\n' + exports;
  await writeLaunchpad(script);
  await writeServer();
};
