import { Log } from '@prisma/client';
import useSWR from 'swr/immutable';
import { fetcher } from '.';

/**
 * Function to fetch logs data from api route
 */
export function useBlocks() {
  const { data, error, isLoading } = useSWR<Log[]>('/logs', fetcher);

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
    isLoading: isLoading,
    isError: errorMessage,
  };
}
