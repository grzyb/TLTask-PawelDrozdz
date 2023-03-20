import { GraphQLEnumType } from 'graphql/index';

export const UsersOrder = new GraphQLEnumType({
  name: 'UserOrder',
  values: {
    ID: {
      value: 'id',
    },
    EMAIL: {
      value: 'email',
    },
    LAST_LOGIN: {
      value: 'lastLogin',
    },
    GENDER: {
      value: 'gender',
    },
  },
});
