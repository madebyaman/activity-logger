import { Activity } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '../../utils';
import { Log } from '@prisma/client';
import { format } from 'date-fns';

export function ShowActivity({ activity }: { activity: Activity }) {
  const { isLoading, data, error } = useSWR<Log[]>(
    `/activities/${activity.id.toString()}`,
    fetcher
  );

  function reduceLogsToDate(
    initial: { date: string; logs: Log[] }[],
    next: Log
  ) {
    let itemFound: boolean = false;
    const newItems = [...initial];
    newItems.forEach((item) => {
      if (item.date === next.date) {
        // add log to that item
        itemFound = true;
        item.logs.push(next);
      }
    });
    if (!itemFound) {
      newItems.push({ date: next.date, logs: [next] });
    }
    return newItems;
  }

  if (isLoading) <p>Loading...</p>;
  if (error) <p>Error fetching data. Try again</p>;
  return (
    <div>
      {data?.reduce(reduceLogsToDate, []).map((uniqueLog) => (
        <div className="mb-6" key={uniqueLog.date}>
          <h3 className="font-bold text-lg mb-1">
            {format(new Date(uniqueLog.date), 'MMM d, Y')}
          </h3>
          {uniqueLog.logs.map((log) => (
            <ul key={log.id} className="list-disc list-inside">
              <li className="text-gray-600 text-sm mb-1">
                {format(new Date(log.from), 'h a')}
                {log.notes && `: ${log.notes}`}
              </li>
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}
