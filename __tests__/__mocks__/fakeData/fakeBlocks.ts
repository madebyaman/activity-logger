import { newBlocks } from '@/utils';
import { Log } from '@prisma/client';

export const fakeBlocks: Log[] = newBlocks(4).map((block, id) => ({
  ...block,
  id,
  notes: '',
  activityId: 1,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
