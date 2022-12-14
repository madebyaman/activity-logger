import { Profile } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '.';

/**
 * Function to fetch user profile from api route
 */
export const useProfile = () => {
  const { data, isLoading, error } = useSWR('/profile', fetcher);

  return {
    profile: data as Profile,
    isLoading,
    isError: error,
  };
};
