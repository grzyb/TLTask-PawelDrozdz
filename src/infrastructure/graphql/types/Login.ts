import { GraphQLObjectType, GraphQLString } from 'graphql/index';

export const Login = new GraphQLObjectType({
  name: 'Login',
  description: 'Login type',
  fields: () => ({ token: { type: GraphQLString } }),
});
