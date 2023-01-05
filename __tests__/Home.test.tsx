import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Home from '../pages/index';

test('Home page is rendering the correct heading', async () => {
  await act(() => {
    render(<Home />);
  });

  const heading = await screen.findByText(/take control of your time/i);
  expect(heading).toBeInTheDocument();

  const screenshot = await screen.findByRole('img', {
    name: /App demo gif/i,
  });
  expect(screenshot).toBeInTheDocument();
});
