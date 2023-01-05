import { generateAPI } from './generateAPI.js';
import { generateBaseSchema, generateGQLSchema } from './generateGQLSchema.js';
import { generateResolvers } from './generateResolvers.js';
import { stitchResolvers } from './stitch.js';
import { writeServer, writeService, writeUtils } from './writer.js';
import { generateLauncher } from './generateLauncher.js';
import { Service, Object, schema, FieldType } from './fetchSchema.js';

async function generateGateway() {
  for (const service of schema.data.services) {
    const resolvers: { functions: string; name: string }[] =
      service.objects.map((object: Object) => {
        return {
          functions: generateResolvers(service, object),
          name: `${object.name}Resolvers`
        };
      });
    const schemas: string[] = service.objects.map((object: Object) =>
      generateGQLSchema(object)
    );
    const resv = stitchResolvers(resolvers);
    const api = generateAPI(service, resv);
    await writeService(service.slug, schemas.join('\n'), api);
  }
}

const additionalFieldTypes = (schema.data.fieldType?.fields ?? [])
  .map((f) => f.fieldType)
  .filter((f) => !!f) as FieldType[];
const fieldTypes =
  typeof schema.data.fieldType !== 'undefined'
    ? schema.data.fieldTypes
        .concat([schema.data.fieldType])
        .concat(additionalFieldTypes)
    : schema.data.fieldTypes;
const types = await generateBaseSchema(fieldTypes, schema.data.scalarTypes);
const typeDefs: string[] = schema.data.services
  .map((s) => s.objects.map((o) => generateGQLSchema(o)))
  .flat();
typeDefs.unshift('\n' + types);

await writeUtils();
await generateLauncher(schema.data.services, typeDefs, schema.data.scalarTypes);
await writeServer(schema.data.services);
await generateGateway();
