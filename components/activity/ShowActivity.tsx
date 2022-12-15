import { Activity } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '../../utils';
import { Log } from '@prisma/client';

export function ShowActivity({ activity }: { activity: Activity }) {
  const { isLoading, data, error } = useSWR<Log[]>(
    `/activities/${activity.id.toString()}`,
    fetcher
  );

  if (isLoading) <p>Loading...</p>;
  if (error) <p>Error fetching data. Try again</p>;
  return (
    <div>
      {data?.map((log) => (
        <p key={log.id}>{log.from}</p>
      ))}
    </div>
  );
}
