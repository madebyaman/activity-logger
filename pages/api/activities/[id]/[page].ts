import { prisma, paginationNumber, validateRoute } from 'lib';

export default validateRoute(async (req, res, user) => {
  const page = Number(req.query.page);
  if (Number.isNaN(page)) {
    res.status(400).json({ message: 'invalid request' });
  }
  const logs = await prisma.log.findMany({
    skip: paginationNumber * page,
    take: paginationNumber,
    where: {
      activityId: Number(req.query.id),
      userId: user.id,
    },
  });
  res.status(200).json(logs);
});
