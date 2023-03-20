import jwt, { JwtPayload, Secret, TokenExpiredError } from 'jsonwebtoken';
import { JwtExpiredError, UnauthorizedError } from '@/infrastructure/errors';
import { User } from '@/infrastructure/database/models';
export const userGuard = async (token?: string): Promise<void> => {
  if (!token) {
    throw new UnauthorizedError();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new UnauthorizedError();
    }
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new JwtExpiredError();
    }
    throw new UnauthorizedError();
  }
};
