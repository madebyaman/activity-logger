import { fetcher } from './fetcher';

export const updateLog = async (logId: number, activityId: number) => {
  try {
    return await fetcher('/logs/update', { logId, activityId });
  } catch (e) {
    return e;
  }
};
