import { prisma, validateRoute } from 'lib';

/**
 * Calls `validateRoute` function and return activities[] or error.
 */
export default validateRoute(async (req, res, user) => {
  const activities = await prisma.activity.findMany({
    where: { userId: user.id },
  });

  return res.status(200).json(activities);
});
