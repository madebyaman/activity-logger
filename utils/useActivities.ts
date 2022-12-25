import { Activity } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '.';

/**
 * Function to fetch activities data from api route
 */
export const useActivities = () => {
  const { data, isLoading, error } = useSWR('/activities', fetcher);

  return {
    activities: data as Activity[],
    isLoading: isLoading,
    isError: error,
  };
};
