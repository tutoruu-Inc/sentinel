import { Service } from './fetchSchema.js';

export const generateAPI = (service: Service, resolvers: string): string => {
  const _class = `${service.name.replace(' ', '')}API`;
  let api = `import { HTTPCache, RESTDataSource${
    service.protected ? ', RequestOptions' : ''
  } } from "apollo-datasource-rest";\n`;
  api += `import { Resolvers } from "../../generated/types.js";\n`;
  api += `import { queryable } from "../../utils/Query.js";\n\n`;
  api += `class ${_class} extends RESTDataSource {\n`;
  api += `\toverride baseURL = "${service.baseApiUrl}";\n`;
  api +=
    'initialize({ context }: { context: any }) {\nthis.context = context\nthis.httpCache = new HTTPCache()\n}\n\n';

  if (service.protected) {
    api += `\ttoken: string = "";\n\n`;
    api +=
      `\toverride willSendRequest(request: RequestOptions) {\n` +
      `\t\trequest.headers.set('Authorization', this.token ?? request.headers.get('Authorization') ?? '');\n}\n\n`;
  }
  api += `\t${resolvers}\n`;
  api += '}\n\n';
  api += `export const ${service.name
    .replace(' ', '')
    .toLocaleUpperCase()} = new ${_class}();\n`;
  return api;
};
