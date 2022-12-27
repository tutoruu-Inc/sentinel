import { Object, Resolver, Service } from './fetchSchema.js';

const functionBodyGen = (resolver: Resolver, service: Service): string => {
  if (resolver.logic)
    return `{\n\t\t\t${resolver.logic.split('\n').join('\n\t\t\t')}\n\t\t},\n`;
  if (!resolver.request) return '{}\n';
  const request = `await this.${resolver.request.method}('${resolver.request.endpoint}')`;
  return `{\n\t\treturn ${
    resolver.request.dataKey
      ? `(${request}).${resolver.request.dataKey}`
      : request
  } \n\t},\n`;
};

const resolverGen = (
  name: string,
  resolvers: Resolver[] = [],
  service: Service
): string => {
  if (resolvers.length === 0) return '';

  let resv = `\t${name}: {\n`;
  for (const resolver of resolvers)
    resv += `\t\t${
      resolver.name
    }: async (parent: any, args: any, context: any, info: any) => ${functionBodyGen(
      resolver,
      service
    )}`;
  ``;

  return resv + '\t},\n';
};

export const generateResolvers = (service: Service, object: Object): string => {
  return (
    `${object.name}Resolvers: Resolvers = {\n` +
    resolverGen('Query', object.queryResolvers, service) +
    resolverGen('Mutation', object.mutationResolvers, service) +
    resolverGen(
      object.name.charAt(0).toUpperCase() + object.name.slice(1),
      object.resolvers,
      service
    ) +
    '}\n'
  );
};
