import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { GraphQLBoolean } from 'graphql/type/scalars';

export const UsersFilters = new GraphQLInputObjectType({
  name: 'UsersFilters',
  fields: {
    email: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    isAdmin: {
      type: GraphQLBoolean,
    },
  },
});
