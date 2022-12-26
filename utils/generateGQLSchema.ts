import type { Field, Mutation, Query, FieldType, Object } from "./loadSchema.js";

const parseField = (field: Field): string =>
  `${field.name}: ${field.fieldType?.name ?? field.baseType?.name}${
    field.required ? "!" : ""
  }`;

const parseFunction = (fn: Mutation | Query): string =>
  `${fn.name}${
    fn.inputs
      ? `(${fn.inputs.map((input) => parseField(input)).join(", ")})`
      : ""
  }: ${fn.returnType.name}!`;

const getTypes = (fieldTypes: FieldType[]): string => {
  const types: string[] = [];
  fieldTypes.forEach((field) => {
    let type = ``;
    if (field.isInput) type += `input ${field.name} {`;
    else type += `type ${field.name} {`;
    if (!field.fields) return type + "}";

    field.fields.forEach((field) => {
      type += `\n  ${parseField(field)}`;
    });
    type += "\n}\n";

    types.push(type);
  });

  return types.join("\n");
};

const getFunctions = (object: Object): string => {
  let queries = "";
  let mutations = "";
  if (object.queries.length > 0) {
    queries += `\nextend type Query {`;
    object.queries.forEach((query) => {
      queries += `\n  ${parseFunction(query)}`;
    });
    queries += "\n}\n";
  }
  if (object.mutations.length > 0) {
    mutations += `\nextend type Mutation {`;
    object.mutations.forEach((mutation) => {
      mutations += `\n  ${parseFunction(mutation)}`;
    });
    mutations += "\n}\n";
  }

  return queries + mutations;
};

export const generateGQLSchema = (object: Object): string =>
  getFunctions(object) + getTypes(object.fieldTypes);
