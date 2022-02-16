import { getDateString } from '../../../utils/getDateString';
import prisma from '../../../utils/prisma';
import { validateRoute } from '../../../utils/validateRoute';

/**
 * Calls `validateRoute` function and returns todays logs or [] if not found
 */
export default validateRoute(async (req, res, user) => {
  const logs = await prisma.log.findMany({
    where: { userId: user.id, dailyLogId: getDateString(new Date()) },
  });
  return res.json(logs || []);
});
