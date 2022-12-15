import { activitiesData } from '../../../utils';
import { prisma, validateRoute } from '../../../lib';

/**
 * Calls `validateRoute` function and return activities[] or error.
 */
export default validateRoute(async (req, res, user) => {
  const activities = await prisma.activity.findMany({
    where: { userId: user.id },
  });

  if (!activities) {
    // Seed default activities
    await Promise.all(
      activitiesData.map((act) => {
        return prisma.activity.create({
          data: {
            name: act.name,
            type: act.type,
            user: {
              connect: { id: user && user.id },
            },
          },
        });
      })
    );

    const newActivities = await prisma.activity.findMany({
      where: { userId: user.id },
    });

    return res.status(200).json(newActivities);
  }

  return res.status(200).json(activities);
});
