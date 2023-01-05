import { ScalarType } from './fetchSchema.js';

export function getScalars(scalars: ScalarType[]): string {
  let scalarTypes = '';
  scalars.forEach((scalar) => {
    scalarTypes += `scalar ${scalar.name}\n`;
  });
  return scalarTypes;
}

export function scalarResolver(scalar: ScalarType): string {
  let scalarResolvers = `new GraphQLScalarType({
    name: '${scalar.name}',
    serialize(value) {${scalar.serializeLogic}},
    parseValue(value) {${scalar.parseLogic}},
  })`;
  return scalarResolvers;
}

export const scalars = (scalars: ScalarType[]): string => {
  let scalarsStr = '';
  scalars.forEach((scalar) => {
    scalarsStr += `${scalar.name}: ${scalarResolver(scalar)},\n`;
  });
  return scalarsStr;
};
