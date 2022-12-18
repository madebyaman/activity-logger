import { activitiesData } from '@/utils';

export const fakeActivities = activitiesData.map((i, id) => ({
  ...i,
  id,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
}));
