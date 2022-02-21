import { getDateString } from '../../../utils/getDateString';
import initialState from '../../../utils/initialState';
import prisma from '../../../utils/prisma';
import { validateRoute } from '../../../utils/validateRoute';

/**
 * Calls `validateRoute` function and returns todays logs or [] if not found
 */
export default validateRoute(async (req, res, user) => {
  const date = getDateString();
  const logs = await prisma.log.findMany({ where: { date: date } });

  // Find `blocksPerHour` from user profile.
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });

  let blocksPerHour = 4;
  if (profile) {
    blocksPerHour = profile.blocksPerHour;
  }

  if (logs.length === blocksPerHour * 24) {
    console.log('ideal logs found');
    // If logs found, return them
    return res.json(logs);
  } else if (logs.length) {
    console.log('not ideal logs found');
    // Clear out the logs that are found. B/c it is not of ideal size.
    await prisma.log.deleteMany({
      where: {
        date: date,
      },
    });
  }
  console.log('adding new logs');
  // Then, add logs for today based on blocksPerHour.
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
  const newLogs = await prisma.log.findMany({ where: { date: date } });
  return res.json(newLogs);
});
