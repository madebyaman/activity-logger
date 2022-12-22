import axios from 'axios';
import { sub } from 'date-fns';
import { useEffect, useState } from 'react';
import { Report } from '@/types';
import { classNames } from '@/utils';
import { PieChart } from '@/components/chart';
import { h3Classes } from '@/components/ui';
import { NextPageWithAuth } from '@/types';

function getBackgroundColor() {
  const getRandomNumber = () => {
    return Math.ceil(Math.random() * 360);
  };
  return `hsl(${getRandomNumber()} 84% 60%)`;
}

type PieChartData = { label: string; minutes: number; color: string };

const Reports: NextPageWithAuth = () => {
  const [report, setReport] = useState<PieChartData[]>([]);
  const [days, setDays] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    let unmounted = false;

    async function getActivitiesData() {
      try {
        const report = await axios.post<Report[]>(
          '/api/logs/report',
          {
            from: new Date(),
            to: sub(new Date(), { days }),
          },
          {
            signal: controller.signal,
          }
        );
        if (!unmounted) {
          const newReport = report.data.map((item) => {
            return {
              label: item.activityName,
              minutes: item.totalMinutes,
              color: getBackgroundColor(),
            };
          });
          setReport(newReport);
        }
      } catch (error) {
        setReport([]);
      }
    }
    getActivitiesData();

    return () => {
      unmounted = true;
      controller.abort;
    };
  }, [days]);

  if (!report) {
    return <div>Loading...</div>;
  }

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
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6 flex justify-center">
              <div className="w-96 h-96">
                {/* <DoughnutChart data={dataBarChart} /> */}
                {report.length ? (
                  <PieChart data={report} width={400} />
                ) : (
                  'No data to show'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Reports.protectedRoute = true;
export default Reports;
