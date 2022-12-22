import { render, screen } from '@testing-library/react';
import { Blocks } from '../components/dashboard';
import DashboardComponent from '../pages/dashboard';
import { fakeActivities } from './__mocks__/fakeData/fakeActivities';

test('Blocks component renders correct blocks', async () => {
  render(<Blocks isLoading="LOADING" />);
  const loadingText = await screen.findByText(/loading\.\.\./i);
  expect(loadingText).toBeInTheDocument();
});

test('Blocks component renders the error message', async () => {
  render(<Blocks isLoading="ERROR" isError="No blocks" />);
  const errorText = await screen.findByText(/error/i);
  expect(errorText).toBeInTheDocument();
});

test('Dashboard page renders the blocks and profile', async () => {
  render(<DashboardComponent />);
  const activityButtons = await screen.findAllByRole('button', {
    name: fakeActivities[1].name,
  });
  const firstActivityButton = activityButtons[0];
  expect(firstActivityButton).toBeInTheDocument();
});
