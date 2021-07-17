import { GraphQLScalarType } from "graphql";
import { DateType } from "@mikro-orm/core";

export const DateTypeScalar = new GraphQLScalarType({
  name: "DateType",
  description: "DateType object date scalar type",

  serialize(value: DateType) {
    return value; 
  },
});