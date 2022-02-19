import { fetcher } from './fetcher';

/**
 * Update a block
 * @param blockId Id of the current block
 * @param activityId Id of the activity
 * @returns updated block
 */
export const updateBlockActivity = async (
  blockId: number,
  activityId: number
) => {
  return await fetcher('/logs/update', { blockId, activityId });
};
