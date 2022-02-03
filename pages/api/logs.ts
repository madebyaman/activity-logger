import { getDateString } from '../../utils/initialState';
import prisma from '../../utils/prisma';
import { validateRoute } from '../../utils/validateRoute';

/**
 * Calls `validateRoute` function and return log[] or error.
 */
export default validateRoute(async (req, res, user) => {
  const logs = await prisma.log.findMany({
    where: { userId: user.id, date: getDateString() },
  });
  return res.json(logs);
});
