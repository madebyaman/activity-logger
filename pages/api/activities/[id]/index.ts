import { paginationNumber, prisma, validateRoute } from 'lib';

export default validateRoute(async (req, res, user) => {
  const logs = await prisma.log.findMany({
    take: paginationNumber,
    where: {
      activityId: Number(req.query.id),
      userId: user.id,
    },
  });
  res.status(200).json(logs);
});
