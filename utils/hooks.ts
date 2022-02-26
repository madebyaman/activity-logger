/**
 * Hooks for Data fetching like user, activities, and logs
 */
import { User } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from './fetcher';

/**
 * Function to fetch user data from api route
 */
export const useUser = () => {
  const { data, error } = useSWR('/user', fetcher);

  return {
    user: data as User,
    isLoading: !error && !data,
    isError: error,
  };
};
