import { Log } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '../../utils';

/**
 * Function to fetch logs data from api route
 */
export const useBlocks = () => {
  const { data, error } = useSWR('/logs', fetcher);

  return {
    blocks: data as Log[],
    isLoading: !error && !data,
    isError: error,
  };
};
