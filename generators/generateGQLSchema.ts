import type {
  Field,
  Mutation,
  Query,
  FieldType,
  Object,
  ScalarType
} from './fetchSchema.js';
import { getScalars } from './generateScalars.js';
import { writeSchema } from './writer.js';

export const parseField = (field: Field): string =>
  `${field.name}: ${
    field.scalarType?.name ?? field.fieldType?.name ?? field.baseType?.name
  }${field.required ? '!' : ''}`;

export const parseFunction = (fn: Mutation | Query): string =>
  `${fn.name}${
    fn.inputs && fn.inputs.length > 0
      ? `(${fn.inputs.map((input) => parseField(input)).join(', ')})`
      : ''
  }: ${fn.returnType.name}!`;

export const getTypes = (fieldTypes: FieldType[]): string => {
  const types: string[] = [];
  fieldTypes.forEach((field) => {
    let type = ``;
    if (field.isInput) type += `input ${field.name}`;
    else if (field.isEnum) {
      if (!field.fields || field.fields.length === 0) return;
      type += `enum ${field.name} {`;
      field.fields.forEach((field) => {
        type += `\n\t${field.name}`;
      });
      return types.push(type + '\n}\n');
    } else type += `type ${field.name}`;
    if (!field.fields || field.fields.length === 0)
      return types.push(type + '\n');

    type += ' {';

    field.fields.forEach((field) => {
      type += `\n  ${parseField(field)}`;
    });
    type += '\n}\n';

    types.push(type);
  });

  return types.join('');
};

const getFunctions = (object: Object): string => {
  let queries = '';
  let mutations = '';
  if (object.queries.length > 0) {
    queries += `extend type Query {`;
    object.queries.forEach((query) => {
      queries += `\n  ${parseFunction(query)}`;
    });
    queries += '\n}\n';
  }
  if (object.mutations.length > 0) {
    mutations += `extend type Mutation {`;
    object.mutations.forEach((mutation) => {
      mutations += `\n  ${parseFunction(mutation)}`;
    });
    mutations += '\n}\n';
  }

  return queries + mutations;
};

export const generateGQLSchema = (object: Object): string =>
  getFunctions(object) + getTypes(object.fieldTypes);

export const generateBaseSchema = async (
  types: FieldType[],
  scalars: ScalarType[]
) => {
  const baseTypes = getTypes(types) + getScalars(scalars);
  await writeSchema(baseTypes);
  return baseTypes;
};
