import { generateAPI } from './generateAPI.js';
import { generateBaseSchema, generateGQLSchema } from './generateGQLSchema.js';
import { generateResolvers } from './generateResolvers.js';
import { stitchResolvers } from './stitch.js';
import { writeService, writeUtils } from './writer.js';
import { generateLauncher } from './generateLauncher.js';
import { Service, Object, schema } from './fetchSchema.js';

const typeDefs: string[] = [];
schema.data.services.forEach((service: Service) => {
  const resolvers: { functions: string; name: string }[] = [];
  const schemas: string[] = [];
  console.log('Creating Service: ' + service.name + '...\n');
  service.objects.forEach((object: Object) => {
    schemas.push(generateGQLSchema(object));
    resolvers.push({
      functions: generateResolvers(service, object),
      name: `${object.name}Resolvers`
    });
    console.log(`\t✓ ${object.name}\n`);
  });
  const resv = stitchResolvers(resolvers);
  const api = generateAPI(service, resv);
  console.log(`\t✓ API Generated\n`);
  writeService(service.slug, schemas.join('\n'), api);
  typeDefs.push(schemas.join('\n'));
});

const fieldTypes = schema.data.fieldType
  ? [...schema.data.fieldTypes, schema.data.fieldType]
  : schema.data.fieldTypes;
const types = await generateBaseSchema(fieldTypes);
typeDefs.unshift('\n' + types);

console.log(`\n\t✓ Base types Generated\n`);
await generateLauncher(schema.data.services, typeDefs);

await writeUtils();

console.log(`\t✓ App launcher\n`);
console.log(`\t✓ Server file\n`);
console.log(`\n\nAPI Gateway ready for deployment.\n`);
