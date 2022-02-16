import { getDateString } from '../../../utils/getDateString';
import initialState from '../../../utils/initialState';
import prisma from '../../../utils/prisma';
import { validateRoute } from '../../../utils/validateRoute';

/**
 * This function is used to add new log enties to the database.
 */
export default validateRoute(async (req, res, user) => {
  // Check if request is 'POST'
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  // Put Logs for today
  const date = getDateString();
  // Find dailyLog table with today's entry and update if not there.
  const todaysLog = await prisma.dailyLog.upsert({
    where: { date: date },
    update: {},
    create: {
      date,
      user: {
        connect: { id: user.id },
      },
      blocksPerHour: 4,
    },
  });

  // Find logs for today
  const logs = await prisma.log.findMany({ where: { dailyLogId: date } });

  // Only if there are no logs for today, create new logs.
  if (!logs.length) {
    await Promise.all(
      initialState(todaysLog.blocksPerHour).map(({ from, to, hour }) => {
        return prisma.log.create({
          data: {
            from,
            hour,
            to,
            User: {
              connect: { id: user.id },
            },
            DailyLog: {
              connect: { date: todaysLog.date },
            },
          },
        });
      })
    );
  }
});
