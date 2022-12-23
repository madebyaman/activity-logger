import { Activity } from '@prisma/client';
import useSWR from 'swr';
import { fetcher, paginationNumber, removeTimezone } from '@/utils';
import { Log } from '@prisma/client';
import { add, format, isValid, parse, parseISO } from 'date-fns';
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils';

export function ShowActivity({ activity }: { activity: Activity }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: totalActivites, isLoading: totalActivitesLoading } = useSWR<{
    totalCount: number;
  }>(`/activities/${activity.id.toString()}`, fetcher);
  const { isLoading, data, error } = useSWR<Log[]>(
    `/activities/${activity.id.toString()}/${currentPage.toString()}`,
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

  function sortLogs(a: Log, b: Log) {
    if (a.from > b.from) return 1;
    if (b.from > a.from) return -1;
    else return 0;
  }

  function previousPageButtonDisabled(): boolean {
    if (currentPage > 1) {
      return false;
    } else {
      return true;
    }
  }

  function nextPageButtonDisabled(): boolean {
    if (!totalActivites) return false;
    const visiblePages = paginationNumber * currentPage;
    if (totalActivites.totalCount > visiblePages) {
      return false;
    } else return true;
  }

  if (isLoading) <p>Loading...</p>;
  if (error) <p>Error fetching data. Try again</p>;

  function formattedDateIfValid(date: string) {
    const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
    if (isValid(parsedDate)) return format(parsedDate, 'MMM d, Y');
  }

  function formattedTime(from: string) {
    const parsedDate = parseISO(from);
    return format(parsedDate, 'h:mm a');
  }

  return (
    <div>
      {data?.reduce(reduceLogsToDate, []).map((uniqueLog) => (
        <div className="mb-6" key={uniqueLog.date}>
          <h3 className="font-bold text-lg mb-1">
            {formattedDateIfValid(uniqueLog.date)}
          </h3>
          {uniqueLog.logs.sort(sortLogs).map((log) => (
            <ul key={log.id} className="list-disc list-inside">
              <li className="text-gray-600 text-sm mb-1">
                {formattedTime(`${log.from}`)}
                {log.notes && `: ${log.notes}`}
              </li>
            </ul>
          ))}
        </div>
      ))}
      <div className="flex justify-between">
        <button
          disabled={previousPageButtonDisabled() ? true : false}
          aria-disabled={previousPageButtonDisabled()}
          onClick={() => setCurrentPage((page) => page - 1)}
          data-testid="previous-logs"
          className={classNames(
            'bg-gray-300 text-gray-800 font-semibold text-sm py-2 px-4 rounded inline-flex items-center gap-1',
            previousPageButtonDisabled()
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-gray-400'
          )}
        >
          <ArrowLeftIcon className="h-4 w-4 text-gray-600" />
          <span>Previous Logs</span>
        </button>
        <button
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={nextPageButtonDisabled()}
          aria-disabled={nextPageButtonDisabled()}
          data-testid="next-logs"
          className={classNames(
            'bg-gray-300 text-gray-800 font-semibold text-sm py-2 px-4 rounded inline-flex items-center gap-1',
            nextPageButtonDisabled()
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-gray-400'
          )}
        >
          <span>Next Logs</span>
          <ArrowRightIcon className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
