import { Log } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '.';

/**
 * Function to fetch logs data from api route
 */
export function useBlocks(): {
  blocks: Log[];
  isLoading: 'ERROR' | 'LOADING' | 'LOADED';
  isError: string | undefined;
} {
  const { data, error } = useSWR('/logs', fetcher);

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
    blocks: data as Log[],
    isLoading: data ? 'LOADING' : error ? 'ERROR' : 'LOADED',
    isError: errorMessage,
  };
}
