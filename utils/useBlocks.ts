import { Log } from '@prisma/client';
import useSWRImmutable from 'swr/immutable';
import { fetcher, newBlocks, removeTimezone } from '.';

/**
 * Function to fetch logs data from api route
 */
export function useBlocks(): {
  blocks: Log[];
  isLoading: 'ERROR' | 'LOADING' | 'LOADED';
  isError: string | undefined;
} {
  const res = useSWRImmutable('/logs', fetcher);
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
  let newBlocks = [];

  if (data) {
    newBlocks = data.blocks.map((item: Log) => ({
      ...item,
      from: removeTimezone(`${item.from}`),
      to: removeTimezone(`${item.to}`),
    }));
  }

  return {
    blocks: newBlocks,
    isLoading: isLoading ? 'LOADING' : error ? 'ERROR' : 'LOADED',
    isError: errorMessage,
  };
}
