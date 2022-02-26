import { fetcher } from '.';

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
