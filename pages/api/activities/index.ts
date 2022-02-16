import prisma from '../../../utils/prisma';
import { validateRoute } from '../../../utils/validateRoute';

/**
 * Calls `validateRoute` function and return activities[] or error.
 */
export default validateRoute(async (req, res, user) => {
  const activities = await prisma.activity.findMany({
    where: { userId: user.id },
  });
  return res.json(activities);
});
