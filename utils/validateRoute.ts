import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../prisma';

interface JwtPayload {
  id: number;
}

/**
 * This function is higher order function. It will check if cookie set is of real user. If so, the `handler` function should continue. Else it throws an error.
 * @param handler An api route function
 * @returns 401 error if no user found, else it calls handler route and passes user to it
 */
export const validateRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { ACTIVITY_LOGGER_TOKEN: token } = req.cookies;

    if (token) {
      let user; // user is declared. So it remains in the scope of this if.

      try {
        const { id } = jwt.verify(
          token,
          process.env.PRIVATE_KEY || 'string'
        ) as JwtPayload;

        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          res.status(401);
          res.json({ error: 'User not found' });
          return;
        }
      } catch (e) {
        res.status(401);
        res.json({ error: 'Not authorized' });
        return;
      }

      return handler(req, res, user);
    }
    res.status(401);
    res.json({ error: 'Not authorized' });
    return;
  };
};
