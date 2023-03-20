import { JWT_EXPIRED } from '@/infrastructure/constants';

export class JwtExpiredError extends Error {
  constructor() {
    super();
    this.message = JWT_EXPIRED;
  }
}
