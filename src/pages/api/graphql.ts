import { graphqlHTTP } from 'express-graphql';
import { schema } from '@/infrastructure/graphql/schemas';
import { GQL_ERROR_CODES } from '@/infrastructure/constants';

export default graphqlHTTP(async req => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  return {
    context: { startTime: Date.now(), token },
    graphiql: process.env.NODE_ENV === 'development',
    schema,
    customFormatErrorFn: error => {
      return { ...error, extensions: { code: GQL_ERROR_CODES[error.message] } };
    },
  };
});
