import { Profile } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '.';

/**
 * Function to fetch user profile from api route
 */
export const useProfile = () => {
  const { data, error } = useSWR('/profile', fetcher);

  return {
    profile: data as Profile,
    isLoading: !error && !data,
    isError: error,
  };
};
