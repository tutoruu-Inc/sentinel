export const stitchResolvers = (
  resolvers: { name: string; functions: string }[]
) => {
  let resv = '';
  resolvers.forEach((resolver) => {
    resv += `${resolver.functions}\n`;
  });
  resv += `resolvers: Resolvers = {\n`;
  let resvq = '\tQuery: {\n';
  let resvm = '\tMutation: {\n';
  resolvers.forEach((resolver) => {
    resv += `\t...this.${resolver.name},\n`;
    resvq += `\t\t...this.${resolver.name}.Query,\n`;
    resvm += `\t\t...this.${resolver.name}.Mutation,\n`;
  });
  resvq += '\t},\n';
  resvm += '\t},\n';
  resv += resvq;
  resv += resvm;
  resv += '}\n';
  return resv;
};
