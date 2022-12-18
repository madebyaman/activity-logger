import { screen, render } from '@testing-library/react';
import ReportPage from '../pages/reports';
import { DoughnutChart } from '../components/chart';
import React from 'react';

test('Doughnut Chart renders', async () => {
  const data = {
    labels: ['Today', 'Yesterday', '2 days ago'],
    datasets: [
      {
        label: 'All Activities',
        data: [15, 18, 20],
      },
    ],
  };
  render(<DoughnutChart data={data} />);
  const chartCanvas = screen.getByTestId('chartBar');
  expect(chartCanvas).toBeInTheDocument();
});
