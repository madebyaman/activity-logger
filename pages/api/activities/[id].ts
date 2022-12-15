import { validateRoute } from '../../../lib';
import { prisma } from '../../../lib/prisma';

export default validateRoute(async (req, res, user) => {
  const logs = await prisma.log.findMany({
    where: {
      activityId: Number(req.query.id),
      userId: user.id,
    },
  });
  res.status(200).json(logs);
});
