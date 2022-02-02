import prisma from '../../utils/prisma';
import { validateRoute } from '../../utils/validateRoute';

/**
 * Calls `validateRoute` function and return profile or error.
 */
export default validateRoute(async (req, res, user) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  return res.json(profile);
});
