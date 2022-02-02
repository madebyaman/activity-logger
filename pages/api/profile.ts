import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';
import { validateRoute } from '../../utils/validateRoute';

/**
 * Calls `validateRoute` function and return profile or error.
 */
const getProfile = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  return res.json(profile);
};

export default validateRoute(getProfile);
