import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { dateString, newBlocks } from '../../../utils';
import { prisma, validateRoute } from '../../../lib';

/**
 * Calls `validateRoute` function and returns todays logs or [] if not found
 */
const getLogs = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  const date = dateString;
  const logs = await prisma.log.findMany({ where: { date: date } });

  // Get `blocksPerHour` from profile db
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  let blocksPerHour = profile ? profile.blocksPerHour : 4;

  if (logs.length) {
    // If logs found, return them
    return res.status(200).json(logs);
  }

  // Then, add logs for today based on blocksPerHour.
  const blocksWithUserId = newBlocks({
    sleepFrom: profile?.sleepFrom || 22,
    sleepTo: profile?.sleepTo || 6,
    noOfBlocksPerHour: blocksPerHour,
  }).map((block) => ({
    ...block,
    userId: user.id,
  }));
  const createMany = await prisma.log.createMany({
    data: blocksWithUserId,
  });
  const newLogs = await prisma.log.findMany({ where: { date: date } });
  return res.status(200).json(blocks);
};

export default validateRoute(getLogs);
