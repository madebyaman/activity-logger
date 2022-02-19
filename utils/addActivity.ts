import { Activity } from '@prisma/client';
import { ActivityType } from '../types';
import { fetcher } from './fetcher';

/**
 * Add a new activity and returns it.
 * @param name Name of the new activity
 * @param type Type is enum of 'Neutral', 'Productive', 'Very Productive', 'Distracting', 'Very Distracting'
 * @returns new activity
 */
export const addActivity = async (
  name: string,
  type: ActivityType
): Promise<Activity> => {
  return await fetcher('/activities/add', { name, type });
};
