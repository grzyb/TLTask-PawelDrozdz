import { BAD_CREDENTIALS } from '@/infrastructure/constants';

export class AuthError extends Error {
  constructor() {
    super();
    this.message = BAD_CREDENTIALS;
  }
}
