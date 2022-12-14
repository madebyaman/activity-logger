import { act, render, screen } from '@testing-library/react';
import { Blocks } from '../components/dashboard';
import DashboardComponent from '../pages/dashboard';

test('Blocks component renders correct blocks', () => {
  render(<Blocks isLoading="LOADING" />);
  const loadingText = screen.getByText(/loading\.\.\./i);
  expect(loadingText).toBeInTheDocument();
});

test('Blocks component renders the error message', () => {
  render(<Blocks isLoading="ERROR" isError="No blocks" />);
  const errorText = screen.getByText(/error/i);
  expect(errorText).toBeInTheDocument();
});

test('Dashboard component renders the blocks and profile', async () => {
  await act(() => {
    render(<DashboardComponent />);
  });
  const noActivityText = await screen.findAllByText(/no activity/i);
  const firstNoActivityText = noActivityText[0];
  expect(firstNoActivityText).toBeInTheDocument();
});
