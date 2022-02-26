import { fetcher } from '.';
import { ActivityTypes } from '../types';

/**
 * Add a new activity and returns it.
 */
export const addActivity = async ({
  name,
  type,
}: {
  name: string;
  type: ActivityTypes;
}) => {
  return await fetcher('/activities/add', { name, type });
};
