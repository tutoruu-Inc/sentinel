import { generateGQLSchema } from "./generateGQLSchema.js";

export interface Resolver {}

export interface Query {
  name: string;
  returnType: {
    name: string;
  };
  inputs?: Field[];
  resolver?: Resolver | null;
}

export interface Mutation {
  name: string;
  returnType: {
    name: string;
  };
  inputs: Field[];
  resolver?: Resolver | null;
}

export interface Field {
  name: string;
  required?: boolean;
  fieldType?: FieldType | null;
  baseType?: BaseType | null;
}

export interface FieldType {
  isInput?: boolean;
  name: string;
  fields?: Field[];
}

export interface BaseType {
  name: string;
}

export interface Object {
  name: string;
  fieldTypes: FieldType[];
  mutations: Mutation[];
  queries: Query[];
  resolvers: Resolver[];
}

export interface Service {
  name: string;
  baseApiUrl: string;
  objects: Object[];
}

export interface Schema {
  data: {
    services: Service[];
  };
}

const schema: Schema = {
  data: {
    services: [
      {
        name: "Core",
        baseApiUrl: "https://api.tutoruu.com",
        objects: [
          {
            name: "User",
            fieldTypes: [
              {
                isInput: true,
                name: "UpdateUserInput",
                fields: [
                  {
                    name: "name",
                    required: false,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "phone",
                    required: false,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "bio",
                    required: false,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "classOf",
                    required: false,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "img_url",
                    required: false,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                ],
              },
              {
                isInput: true,
                name: "CreateUserInput",
                fields: [
                  {
                    name: "name",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "phone",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "email",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "phone",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "university",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                ],
              },
              {
                isInput: false,
                name: "User",
                fields: [
                  {
                    name: "name",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "phone",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "bio",
                    required: false,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "classOf",
                    required: false,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "img_url",
                    required: false,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "date",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "_id",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "username",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                  {
                    name: "email",
                    required: true,
                    fieldType: null,
                    baseType: {
                      name: "String",
                    },
                  },
                ],
              },
            ],
            mutations: [
              {
                name: "createUser",
                returnType: {
                  name: "User",
                },
                inputs: [
                  {
                    name: "input",
                    baseType: null,
                    fieldType: {
                      name: "CreateUserInput",
                    },
                  },
                ],
                resolver: null,
              },
              {
                name: "updateUser",
                returnType: {
                  name: "User",
                },
                inputs: [
                  {
                    name: "_id",
                    baseType: {
                      name: "String",
                    },
                    fieldType: null,
                  },
                  {
                    name: "input",
                    baseType: null,
                    fieldType: {
                      name: "UpdateUserInput",
                    },
                  },
                ],
                resolver: null,
              },
              {
                name: "deleteUser",
                returnType: {
                  name: "User",
                },
                inputs: [
                  {
                    name: "_id",
                    baseType: {
                      name: "String",
                    },
                    fieldType: null,
                  },
                ],
                resolver: null,
              },
            ],
            queries: [
              {
                name: "user",
                returnType: {
                  name: "User",
                },
                inputs: [
                  {
                    name: "email",
                    baseType: {
                      name: "String",
                    },
                    fieldType: null,
                  },
                ],
                resolver: null,
              },
              {
                name: "user",
                returnType: {
                  name: "User",
                },
                inputs: [
                  {
                    name: "username",
                    baseType: {
                      name: "String",
                    },
                    fieldType: null,
                  },
                ],
                resolver: null,
              },
              {
                name: "user",
                returnType: {
                  name: "User",
                },
                inputs: [
                  {
                    name: "_id",
                    baseType: {
                      name: "String",
                    },
                    fieldType: null,
                  },
                ],
                resolver: null,
              },
            ],
            resolvers: [],
          },
        ],
      },
    ],
  },
};

schema.data.services.forEach((service: Service) => {
  service.objects.forEach((object: Object) => {
    const gqlSchema = generateGQLSchema(object);
    console.log(gqlSchema);
  });
});
