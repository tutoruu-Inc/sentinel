import fetch from 'node-fetch';

export interface Resolver {
  name: string;
  request?: {
    method: string;
    endpoint: string;
    dataKey?: string;
    queryable: boolean;
  } | null;
  logic?: string | null;
}

export interface Query {
  name: string;
  returnType: {
    name: string;
    __typename: string;
  };
  inputs: Field[];
}

export interface Mutation {
  name: string;
  returnType: {
    name: string;
    __typename: string;
  };
  inputs: Field[];
}

export interface Field {
  name: string;
  required?: boolean;
  fieldType?: FieldType | null;
  baseType?: BaseType | null;
  scalarType?: ScalarType | null;
}

export interface FieldType {
  isInput?: boolean;
  isEnum?: boolean;
  name: string;
  fields?: Field[];
}

export interface BaseType {
  name: string;
}

export interface ScalarType {
  name: string;
  parseLogic: string;
  serializeLogic: string;
}

export interface Object {
  name: string;
  fieldTypes: FieldType[];
  mutations: Mutation[];
  queries: Query[];
  queryResolvers?: Resolver[];
  mutationResolvers?: Resolver[];
  resolvers: Resolver[];
}

export interface Service {
  name: string;
  slug: string;
  baseApiUrl: string;
  objects: Object[];
  protected?: boolean;
}

export interface Schema {
  data: {
    services: Service[];
    fieldTypes: FieldType[];
    fieldType?: FieldType;
    scalarTypes: ScalarType[];
  };
}

const res = await fetch(
  'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clc4wj38x0cao01uvcm1337ed/master',
  {
    method: 'POST',
    body: JSON.stringify({
      query: `query Services {
            scalarTypes {
              name
              parseLogic
              serializeLogic
            }
            fieldType(where: {name: "QueryOptions"}) {
              name
              isInput
              fields {
                name
                baseType {
                  name
                }
                fieldType {
                  name
                  isInput
                  fields {
                    name
                    baseType {
                      name
                    }
                    fieldType {
                      name
                    }
                    required
                  }
                  isEnum
                  isBaseType
                }
                required
              }
              isEnum
              isBaseType
            }
            fieldTypes(where: {isBaseType: true}) {
              isInput
              isEnum
              name
              fields {
                name
                required
                fieldType {
                  name
                }
                baseType {
                  name
                }
                scalarType {
                  name
                }
              }
            }
            services {
              name
              baseApiUrl
              protected
              objects {
                name
                fieldTypes {
                  isInput
                  isEnum
                  name
                  fields {
                    name
                    required
                    fieldType {
                      name
                    }
                    baseType {
                      name
                    }
                    scalarType {
                      name
                    }
                  }
                }
                mutations {
                  name
                  returnType {
                    __typename
                    ... on BaseType {
                      name
                    }
                    ... on FieldType {
                      name
                    }
                  }
                  inputs {
                    name
                    baseType {
                      name
                    }
                    fieldType {
                      name
                    }
                    scalarType {
                      name
                    }
                    required
                  }
                }
                queries {
                  name
                  returnType {
                    __typename
                    ... on BaseType {
                      name
                    }
                    ... on FieldType {
                      name
                    }
                  }
                  inputs {
                    name
                    baseType {
                      name
                    }
                    fieldType {
                      name
                    }
                    scalarType {
                      name
                    }
                    required
                  }
                }
                resolvers {
                  name
                  request {
                    queryable
                    endpoint
                    dataKey
                    method
                  }
                  logic
                }
                queryResolvers {
                  name
                  logic
                  request {
                    queryable
                    method
                    endpoint
                    dataKey
                  }
                }
                mutationResolvers {
                  logic
                  name
                  request {
                    queryable
                    method
                    endpoint
                    dataKey
                  }
                }
              }
              slug
            }
        }`
    })
  }
);

export const schema: Schema = (await res.json()) as Schema;

console.log(`✓ Schema fetched`);
