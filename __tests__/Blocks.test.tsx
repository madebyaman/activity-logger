import { render, screen } from '@testing-library/react';
import { Blocks } from '../components/dashboard';
import DashboardComponent from '../pages/dashboard';
import { fakeActivities } from './__mocks__/fakeData/fakeActivities';
import { fakeProfile } from './__mocks__/fakeData/fakeProfile';

test('Blocks component renders the error message', async () => {
  render(<Blocks isError="No blocks" blocks={[]} profile={fakeProfile} />);
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
