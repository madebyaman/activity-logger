import { getDateString } from '../../../utils/getDateString';
import initialState from '../../../utils/initialState';
import prisma from '../../../utils/prisma';
import { validateRoute } from '../../../utils/validateRoute';

/**
 * This function is used to add new log enties to the database.
 */
export default validateRoute(async (req, res, user) => {
  // Put Logs for today
  const date = getDateString();

  // Find logs for today
  const logs = await prisma.log.findMany({ where: { date: date } });

  // Find `blocksPerHour` from user profile.
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });

  let blocksPerHour = 4;
  if (profile) {
    blocksPerHour = profile.blocksPerHour;
  }

  // Only if there are no logs for today, create new logs.
  if (!logs.length) {
    await Promise.all(
      initialState(blocksPerHour).map(({ from, to, hour }) => {
        return prisma.log.create({
          data: {
            from,
            hour,
            to,
            date,
            User: {
              connect: { id: user.id },
            },
          },
        });
      })
    );
  }
});
