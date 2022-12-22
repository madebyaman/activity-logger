import { PieChart } from '@/components/chart';
import { act, findByRole, render, screen } from '@testing-library/react';
import { fakeReport } from './__mocks__/fakeData/fakeReports';
import ReportPage from '@/pages/reports';
import userEvent from '@testing-library/user-event';

test('Pie chart component renders correctly', async () => {
  render(<PieChart data={fakeReport} width={400} />);
  const totalMinutes = fakeReport.reduce(
    (cummulative, current) => cummulative + current.minutes,
    0
  );
  const totalMinutesText = await screen.findByText(`${totalMinutes} Minutes`);
  expect(totalMinutesText).toBeInTheDocument();

  const totalActivites = fakeReport.length;
  const totalActivitiesText = await screen.findByText(
    `${totalActivites} Activities`
  );
  expect(totalActivitiesText).toBeInTheDocument();
});

test('Report page renders no report', async () => {
  await act(() => render(<ReportPage />));
  const user = userEvent.setup();
  const lastWeekButton = await screen.findByRole('button', {
    name: /last week/i,
  });
  user.click(lastWeekButton);

  const noDataText = await screen.findByText(/no data to show/i);
  expect(noDataText).toBeInTheDocument();
});

test('Report page renders report', async () => {
  render(<ReportPage />);

  const totalMinutes = fakeReport.reduce(
    (cummulative, current) => cummulative + current.minutes,
    0
  );
  const totalMinutesText = await screen.findByText(`${totalMinutes} Minutes`);
  expect(totalMinutesText).toBeInTheDocument();
});
