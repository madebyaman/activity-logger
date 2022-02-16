import { getDateString } from '../../utils/getDateString';
import prisma from '../../utils/prisma';
import { validateRoute } from '../../utils/validateRoute';

/**
 * Gives the daily log of the user for today
 */
export default validateRoute(async (req, res, user) => {
  const dailyLog = await prisma.dailyLog.findUnique({
    where: { date: getDateString(new Date()) },
  });
  return res.json(dailyLog);
});
