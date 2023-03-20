import { GraphQLObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User as UserModel } from '@/infrastructure/database/models';

export const User = new GraphQLObjectType({
  name: 'User',
  description: 'User model',
  fields: Object.assign(attributeFields(UserModel, { exclude: ['password', 'deletedAt'] }), {}),
});
