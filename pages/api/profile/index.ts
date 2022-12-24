import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../../lib';
import { prisma } from '../../../lib/prisma';

/**
 * Calls `validateRoute` function and return profile or error. It also sends if user verified property
 */
const getProfile = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  console.log(new Date());
  return res.json({ ...profile, isVerified: user.isVerified });
};

export default validateRoute(getProfile);
