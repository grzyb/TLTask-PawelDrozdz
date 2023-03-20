import { GraphQLList, GraphQLInt } from 'graphql';
import { User as UserModel } from '@/infrastructure/database/models';
import { User } from '@/infrastructure/graphql/types/User';
import { Dir, UsersFilters, UsersOrder } from '@/infrastructure/graphql/types';
import { usersResolver } from '@/infrastructure/graphql/resolvers';
import { usersFilterBuilder } from '@/infrastructure/graphql/utils';
import {
  GraphqlContext,
  UsersFilters as UsersFiltersInterface,
} from '@/infrastructure/types/interfaces';
import { userGuard } from '@/infrastructure/graphql/guards';

export const usersSchema = {
  users: {
    type: new GraphQLList(User),
    args: {
      page: {
        type: GraphQLInt,
      },
      pageSize: {
        type: GraphQLInt,
      },
      order: {
        type: UsersOrder,
      },
      dir: {
        type: Dir,
      },
      filters: {
        type: UsersFilters,
      },
    },
    resolve: usersResolver,
  },
  usersTotal: {
    type: GraphQLInt,
    args: {
      filters: {
        type: UsersFilters,
      },
    },
    resolve: async (
      parent: undefined,
      arg: { filters?: UsersFiltersInterface },
      context: GraphqlContext
    ) => {
      await userGuard(context.token);
      return UserModel.count({
        where: {
          ...usersFilterBuilder(arg.filters),
        },
      });
    },
  },
};
