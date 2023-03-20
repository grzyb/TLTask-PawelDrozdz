import { GraphQLEnumType } from 'graphql/index';

export const Dir = new GraphQLEnumType({
  name: 'Dir',
  values: {
    ASC: {
      value: 'ASC',
    },
    DESC: {
      value: 'DESC',
    },
  },
});
