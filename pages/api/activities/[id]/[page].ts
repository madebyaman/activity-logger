import { prisma, validateRoute } from 'lib';
import { paginationNumber } from 'utils';

export default validateRoute(async (req, res, user) => {
  const page = Number(req.query.page);
  if (Number.isNaN(page)) {
    res.status(400).json({ message: 'invalid request' });
  }
  const logs = await prisma.log.findMany({
    skip: paginationNumber * (page - 1),
    take: paginationNumber,
    where: {
      activityId: Number(req.query.id),
      userId: user.id,
    },
    orderBy: {
      from: 'desc',
    },
  });
  res.status(200).json(logs);
});
