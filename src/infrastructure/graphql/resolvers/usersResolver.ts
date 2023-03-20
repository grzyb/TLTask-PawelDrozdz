import { resolver } from 'graphql-sequelize';
import { User as UserModel } from '@/infrastructure/database/models';
import { usersFilterBuilder } from '@/infrastructure/graphql/utils';
import { userGuard } from '@/infrastructure/graphql/guards';

export const usersResolver = resolver(UserModel, {
  before: async (findOptions, args, context) => {
    await userGuard(context.token);
    const options = {
      ...findOptions,
      limit: args.pageSize,
      order: [[args.order || 'id', args.dir || 'ASC']],
      offset: (args.page - 1) * args.pageSize || 0,
    };
    return { ...options, where: { ...usersFilterBuilder(args.filters) } };
  },
});
