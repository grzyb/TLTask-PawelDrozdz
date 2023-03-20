// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthError } from '@/infrastructure/errors';
import { graphql } from 'graphql';
import { schema } from '@/infrastructure/graphql/schemas';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const inputData = JSON.parse(req.body);
  try {
    const loginResult = await graphql({
      schema,
      source: `
        mutation loginMutation {
          login(email: "${inputData.email}", password: "${inputData.password}"){
            token
          }
        }
      `,
    });

    if (loginResult?.data?.login && loginResult.data.login.token) {
      res.setHeader("Set-Cookie", `sessionJwt=${loginResult.data.login.token}; Max-Age=${process.env.JWT_EXP_IN_SECONDS}; HttpOnly; SameSite=Lax; Path=/`);
      res.status(200);
      res.end(JSON.stringify(loginResult.data.login));
    } else {
      res.status(403);
      res.end();
    }
  } catch(error: AuthError) {
    res.status(403);
    res.end();
  }
}
