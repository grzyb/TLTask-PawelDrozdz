import jwt, { Secret } from 'jsonwebtoken';
import { Op } from 'sequelize';
import { GraphQLFieldResolver } from 'graphql/type/definition';
import { AuthError } from '@/infrastructure/errors';
import { GraphqlContext } from '@/infrastructure/types/interfaces';
import { User } from '@/infrastructure/database/models';

export const loginResolver: GraphQLFieldResolver<
  undefined,
  GraphqlContext,
  { email: string; password: string }
> = async (parent, args) => {
  const user = await User.findOne({
    where: {
      email: { [Op.eq]: args.email },
      password: { [Op.eq]: args.password }, //pass as plaintext only for mock reasons
    },
  });
  if (!user) {
    throw new AuthError();
  }
  user.set('lastLogin', new Date());
  await user.save();
  const payload = { ...user.dataValues, password: undefined };
  return {
    token: jwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXP_IN_SECONDS as string),
      },
      process.env.JWT_SECRET as Secret
    ),
  };
};
