import { Activity } from '@prisma/client';
import { fetcher } from '../../utils/fetcher';

/**
 * Add a new activity and returns it.
 * @param name Name of the new activity
 * @param type Type is enum of 'Neutral', 'Productive', 'Very Productive', 'Distracting', 'Very Distracting'
 * @returns new activity
 */
export const addActivity = async (
  name: string,
  type: Activity
): Promise<Activity> => {
  return await fetcher('/activities/add', { name, type });
};

/**
 * Update a block
 */
export const updateBlock = async (
  blockId: number,
  activityId: number,
  notes: string
) => {
  return await fetcher('/logs/update', { blockId, activityId, notes });
};

/**
 * Returns if a block should be allowed to edit.
 * @param to Date -- time where the current block ends
 * @returns boolean -- true if `to` is less than current time
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date(Date.now());
  return new Date(to) <= currentTime;
};
