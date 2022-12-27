import fs from 'fs/promises';
export const writeService = async (
  name: string,
  schema: string,
  api: string
) => {
  try {
    await fs.rm(`./services/${name}`, { recursive: true });
  } catch (err) {
    const error = err satisfies unknown as { code: string; errno: number };
    if (error.code !== 'ENOENT') {
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
  await fs.writeFile('./services/launchpad.ts', script);
};

export const writeSchema = async (schema: string) => {
  try {
    await fs.writeFile('./services/schema.graphql', schema);
  } catch (err) {
    const error = err satisfies unknown as { code: string; errno: number };
    if (error.code !== 'ENOENT') {
      console.error(err);
      return false;
    }
    try {
      await fs.mkdir('./services');
    } catch (err) {}
    await fs.writeFile('./services/schema.graphql', schema);
  }
};
export const writeServer = async () => {
  await fs.writeFile(
    './server.ts',
    `import { ApolloServer, BaseContext } from "@apollo/server";\n` +
      `import { startStandaloneServer } from "@apollo/server/standalone";\n\n` +
      `import { resolvers, typeDefs } from "./services/launchpad.js";\n\n` +
      `const server = new ApolloServer<BaseContext>({ typeDefs, resolvers });\n\n` +
      `await startStandaloneServer(server, { listen: { port: 8000 } });\n`
  );
};
