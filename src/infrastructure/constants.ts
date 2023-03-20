export const BAD_CREDENTIALS = 'BAD_CREDENTIALS';
export const AUT_ERROR = 'AUTH_ERROR';
export const JWT_EXPIRED = 'JWT_EXPIRED';
export const GQL_ERROR_CODES: Record<string, number> = {
  [BAD_CREDENTIALS]: 1,
  [AUT_ERROR]: 2,
  [JWT_EXPIRED]: 3,
};
