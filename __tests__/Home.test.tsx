import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('Home page is rendering the correct heading', () => {
  render(<Home />);

  const heading = screen.getByRole('heading', {
    name: /take back control of your time/i,
  });
  expect(heading).toBeInTheDocument();

  const screenshot = screen.getByRole('img', {
    name: /screenshot of activity logger app/i,
  });
  expect(screenshot).toBeInTheDocument();
});
