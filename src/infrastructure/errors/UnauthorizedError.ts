import { AUT_ERROR } from '@/infrastructure/constants';

export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = AUT_ERROR;
  }
}
