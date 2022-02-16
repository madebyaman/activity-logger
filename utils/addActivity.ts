import { ActivityType } from '../types';
import { fetcher } from './fetcher';

export const addActivity = async (name: string, type: ActivityType) => {
  try {
    return await fetcher('/activities/add', { name, type });
  } catch (e) {
    return e;
  }
};
