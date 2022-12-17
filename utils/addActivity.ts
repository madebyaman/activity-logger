import axios from 'axios';
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
  return await axios.post('/activities/add', { name, type });
};
