import { fetcher } from './fetcher';

export const updateBlockActivity = async (
  logId: number,
  activityId: number
) => {
  return await fetcher('/logs/update', { logId, activityId });
};
