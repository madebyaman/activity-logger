import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../lib/validateRoute';

/**
 * Calls `validateRoute` function and return a user or error.
 */
export default validateRoute(
  (req: NextApiRequest, res: NextApiResponse, user: User) => res.json(user)
);
