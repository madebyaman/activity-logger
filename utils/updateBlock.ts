import axios from 'axios';

/**
 * Update a block
 */
export const updateBlock = async (
  blockId: number,
  activityId: number,
  notes: string
) => {
  return await axios.post('/api/logs/update', { blockId, activityId, notes });
};
