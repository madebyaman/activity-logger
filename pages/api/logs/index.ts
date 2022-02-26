import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute, getDateString, newBlocks } from '../../../utils';
import prisma from '../../../utils/prisma';

/**
 * Calls `validateRoute` function and returns todays logs or [] if not found
 */
const getLogs = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  const date = getDateString();
  const logs = await prisma.log.findMany({ where: { date: date } });

  // Get `blocksPerHour` from profile db
  const profile = await prisma.profile.findOne({
    where: { user: { id: user.id } },
  });
  const { blocksPerHour } = profile;

  // Sometimes, only few logs are added to the db.
  if (logs.length === 96 || logs.length === 48 || logs.length === 24) {
    // If logs found, return them
    return res.json(logs);
  } else if (logs.length) {
    // Clear out the logs that are found. B/c it is not of ideal size.
    await prisma.log.deleteMany({
      where: {
        date: date,
      },
    });
  }
  // Then, add logs for today based on blocksPerHour.
  const blocksWithUserId = newBlocks(blocksPerHour).map((block) => ({
    ...block,
    userId: user.id,
  }));
  const createMany = await prisma.log.createMany({
    data: blocksWithUserId,
  });
  const newLogs = await prisma.log.findMany({ where: { date: date } });
  return res.json(newLogs);
};

export default validateRoute(getLogs);
