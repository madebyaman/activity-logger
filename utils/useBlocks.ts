import { Log } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher, newBlocks } from '.';

/**
 * Function to fetch logs data from api route
 */
export function useBlocks(): {
  blocks: Log[];
  isLoading: 'ERROR' | 'LOADING' | 'LOADED';
  isError: string | undefined;
} {
  const res = useSWR('/logs', fetcher);
  const { data, error, isLoading } = res;

  let errorMessage: undefined | string;
  if (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && `toString` in error) {
      errorMessage = error.toString();
    } else {
      errorMessage = 'Error fetching data';
    }
  }

  return {
    blocks: data && (data.blocks as Log[]),
    isLoading: isLoading ? 'LOADING' : error ? 'ERROR' : 'LOADED',
    isError: errorMessage,
  };
}
