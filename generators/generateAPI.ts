import { Service } from './fetchSchema.js';

export const generateAPI = (service: Service, resolvers: string): string => {
  const _class = `${service.name}API`;
  let api = `import { RESTDataSource } from "@apollo/datasource-rest";\n`;
  api += `import { Resolvers } from "../../generated/types.js";\n\n`;
  api += `class ${_class} extends RESTDataSource {\n`;
  api += `\toverride baseURL = "${service.baseApiUrl}";\n`;
  api += `\t${resolvers}\n`;
  api += '}\n\n';
  api += `export const ${service.name.toLocaleUpperCase()} = new ${_class}();\n`;
  return api;
};
