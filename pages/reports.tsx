import { Bar, DoughnutChart } from '../components/chart';
import { h3Classes } from '../components/ui';
import { NextPageWithAuth } from '../types';

const Reports: NextPageWithAuth = () => {
  const labelsBarChart = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  const dataBarChart = {
    labels: labelsBarChart,
    datasets: [
      {
        label: 'All Activities',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h2 className={h3Classes + ' font-display'}>All Activities</h2>
            <p className="mt-1 text-sm text-gray-600">
              This is your report for all activities
            </p>
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
      <div className="md:grid md:grid-cols-3 md:gap-6 mt-4">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h2 className={h3Classes + ' font-display'}>
              Productive Activities
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              This is your report for productive activites. Select the type of
              activity to show their report.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow border border-gray-50 sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <Bar data={dataBarChart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Reports.protectedRoute = true;
export default Reports;
