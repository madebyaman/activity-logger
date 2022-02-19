/**
 * Hooks for Data fetching like user, activities, and logs
 */
import { Profile, User, Activity } from '@prisma/client';
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
