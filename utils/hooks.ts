/**
 * Hooks for Data fetching like user, activities, and logs
 */
import { Log, Profile, User } from '@prisma/client';
import useSWR from 'swr';
import { Activity } from '../types';
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
 * Function to fetch logs data from api route
 */
export const useLogs = () => {
  const { data, error } = useSWR('/logs', fetcher);

  return {
    logs: data as Log[],
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
