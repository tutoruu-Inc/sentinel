import { generateAPI } from './generateAPI.js';
import { generateBaseSchema, generateGQLSchema } from './generateGQLSchema.js';
import { generateResolvers } from './generateResolvers.js';
import { stitchResolvers } from './stitch.js';
import { writeService, writeUtils } from './writer.js';
import { generateLauncher } from './generateLauncher.js';
import { Service, Object, schema } from './fetchSchema.js';
import { client } from './generateClient.js';

const typeDefs: string[] = [];
schema.data.services.forEach(async (service: Service) => {
  const resolvers: { functions: string; name: string }[] = [];
  const schemas: string[] = [];
  service.objects.forEach((object: Object) => {
    schemas.push(generateGQLSchema(object));
    resolvers.push({
      functions: generateResolvers(service, object),
      name: `${object.name}Resolvers`
    });
  });
  const resv = stitchResolvers(resolvers);
  const api = generateAPI(service, resv);
  writeService(service.slug, schemas.join('\n'), api);
  typeDefs.push(schemas.join('\n'));
  console.log('✓ Created Service: ' + service.name);
});

const fieldTypes = schema.data.fieldType
  ? [...schema.data.fieldTypes, schema.data.fieldType]
  : schema.data.fieldTypes;
const types = await generateBaseSchema(fieldTypes);

typeDefs.unshift('\n' + types);
await generateLauncher(schema.data.services, typeDefs);

await writeUtils();
