import { Activity } from '@prisma/client';
import useSWR from 'swr';

import { fetcher } from '../../utils';

/**
 * Function to fetch activities data from api route
 */
export const useActivities = () => {
  const { data, error } = useSWR('/activities', fetcher);

  return {
    activities: data as Activity[],
    isLoading: !error && !data,
    isError: error,
  };
};
