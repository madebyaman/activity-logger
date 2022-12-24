import { dateString, newBlocks } from '@/utils';
import { Log } from '@prisma/client';
import { fakeProfile } from './fakeProfile';

export const fakeBlocks: Log[] = newBlocks({
  noOfBlocksPerHour: fakeProfile.blocksPerHour,
  date: dateString(-330),
}).map((block, id) => ({
  ...block,
  id,
  notes: '',
  activityId: 1,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
