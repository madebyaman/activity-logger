import { Profile } from '@prisma/client';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '.';

/**
 * Function to fetch user profile from api route
 */
export const useProfile = () => {
  const { data, isLoading, error } = useSWRImmutable('/profile', fetcher);

  return {
    profile: data as Profile & { isVerified: boolean },
    isLoading,
    isError: error,
  };
};
