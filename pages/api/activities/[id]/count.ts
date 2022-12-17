import { prisma, validateRoute } from 'lib';

export default validateRoute(async (req, res, user) => {
  const totalLogs = await prisma.log.count({
    where: {
      activityId: Number(req.query.id),
      userId: user.id,
    },
  });
  res.status(200).json(totalLogs);
});
