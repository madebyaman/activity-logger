import { Log } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

async function fetcher(url: string) {
  const res = await axios.post(`${window.location.origin}/api${url}`, {
    timeZone: new Date().getTimezoneOffset(),
  });
  return res.data;
}
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
