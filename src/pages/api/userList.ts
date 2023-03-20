// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { graphql } from 'graphql';

import { schema } from '@/infrastructure/graphql/schemas';
import { AUT_ERROR, BAD_CREDENTIALS, JWT_EXPIRED } from '@/infrastructure/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: add paging, or infinite scroll with Intersection Observer
  const page = 1;
  const pageSize = 20;

  // TODO Find a way to access the auth cookie without input OR add backend API proxy to handle the token from login

  try {
    const usersResult = await graphql({
      schema,
      source: `
        {
          users(page: ${page}, pageSize: ${pageSize}) {
            id,
            email,
            firstName,
            lastName,
            gender,
            image
          }
        }
      `,
      contextValue: {
        token: extractToken(req.headers.authorization),
      }
    });

    if (usersResult.errors) {
      throw usersResult.errors[0];
    }

    if (usersResult?.data?.users) {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(usersResult.data.users));
    }
  } catch(error) {
    // TODO: Use messages to display after redirect?
    switch(error.message) {
      case BAD_CREDENTIALS:
        res.setHeader("X-Error-Message", "Wrong username and/or password.")
        res.redirect(401, "/");
        break;
      case JWT_EXPIRED:
        res.setHeader("X-Error-Message", "Your security token has expired. Please login again.")
        res.redirect(403, "/");
        break;
      case AUT_ERROR:
        res.setHeader("X-Error-Message", "Unauthorized");
        res.redirect(401, "/");
        break;
      default:
        res.redirect(500, "/");
    }
    res.end();
  }
}

const extractToken = (headerValue: string | undefined): string => headerValue ? headerValue.split(" ")[1] : "";
