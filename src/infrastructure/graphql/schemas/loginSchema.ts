import { Login } from '@/infrastructure/graphql/types';
import { GraphQLNonNull, GraphQLString } from 'graphql/index';
import { loginResolver } from '@/infrastructure/graphql/resolvers';

export const loginSchema = {
  login: {
    type: Login,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: loginResolver,
  },
};
