import { Activity } from '@prisma/client';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '.';

/**
 * Function to fetch activities data from api route
 */
export const useActivities = () => {
  const { data, isLoading, error } = useSWRImmutable('/activities', fetcher);

  return {
    activities: data as Activity[],
    isLoading: isLoading,
    isError: error,
  };
};
