import { Service } from "./loadSchema.js";

export const generateAPI = (service: Service): string => {
  const _class = `${service.name}API`;
  let api = `import { RESTDataSource } from "@apollo/datasource-rest";\n\n`;
  api += `class ${_class} extends RESTDataSource {\n`;
  api += `\toverride baseURL = "${service.baseApiUrl}";\n`;
  api += "}\n\n";
  api += `export const ${service.name.toLocaleUpperCase()} = new ${_class}();\n`;
  return api;
};
