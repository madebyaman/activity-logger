import axios from 'axios';
import { sub } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Report } from '@/types';
import { classNames } from '@/utils';
import { DoughnutChart } from '@/components/chart';
import { h3Classes } from '@/components/ui';
import { NextPageWithAuth } from '@/types';

function getBackgroundColor(type: string[]): string[] {
  const getRandomNumber = (min: number, max: number) => {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand += min;
    return rand;
  };
  const colors = type.map((item) => {
    switch (item) {
      case 'Productive':
        return `hsl(${getRandomNumber(120, 150)}, 100%, 70%)`;
      case 'Very Productive':
        return `hsl(${getRandomNumber(120, 145)}, 70%, 70%)`;
      case 'Distracting':
        return `hsl(${getRandomNumber(30, 45)}, 100%, 50%)`;
      case 'Very Distracting':
        return `hsl(${getRandomNumber(0, 15)}, 100%, 50%)`;
      case 'Neutral':
        return `hsl(135, 0%, ${getRandomNumber(0, 50)}%)`;
      default:
        return `hsl(135, 0%, ${getRandomNumber(0, 50)}%)`;
    }
  });
  return colors;
}

const Reports: NextPageWithAuth = () => {
  const [report, setReport] = useState<Report[]>([]);
  const router = useRouter();
  const [days, setDays] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    let unmounted = false;

    async function getActivitiesData() {
      const report = await axios.post(
        '/api/logs/report',
        {
          from: new Date(),
          to: sub(new Date(), { days }),
        },
        {
          signal: controller.signal,
        }
      );
      !unmounted && setReport(report.data as Report[]);
    }
    getActivitiesData();

    return () => {
      unmounted = true;
      controller.abort;
    };
  }, [days]);

  if (!report.length) {
    return <div>Loading...</div>;
  }

  const dataBarChart = {
    labels: report.map((item) => item.activityName),
    datasets: [
      {
        label: 'All Activities',
        data: report.map((item) => item.totalMinutes),
        backgroundColor: getBackgroundColor(
          report.map((item) => item.activityType)
        ),
      },
    ],
  };

  const buttons = [
    { name: 'Today', onClick: () => setDays(1), current: days === 1 },
    { name: 'Last week', onClick: () => setDays(7), current: days === 7 },
    { name: 'Last month', onClick: () => setDays(30), current: days === 30 },
  ];

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h2 className={h3Classes + ' font-display'}>All Activities</h2>
            <p className="mt-2 text-sm text-gray-600">
              This is your report of all activities for{' '}
              {buttons.find((button) => button.current)?.name.toLowerCase()}
            </p>
            <div className="mt-4 flex justify-start gap-4">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  defaultValue={buttons.find((button) => button.current)?.name}
                >
                  {buttons.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="flex space-x-4" aria-label="Tabs">
                  {buttons.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={tab.onClick}
                      className={classNames(
                        tab.current
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:text-gray-800',
                        'px-3 py-2 font-medium text-sm rounded-md'
                      )}
                      aria-current={tab.current ? 'page' : undefined}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow border border-gray-50 sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <DoughnutChart data={dataBarChart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Reports.protectedRoute = true;
export default Reports;
