import { screen, render } from '@testing-library/react';
import ForgotPassword from '../pages/forgot-password';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/initial');
});

test('Forgot password component is rendering', async () => {
  render(<ForgotPassword />);
  jest.mock('next/router', () => require('next-router-mock'));

  const forgotPasswordHeading = await screen.findByRole('heading', {
    name: /forgot password/i,
  });
  expect(forgotPasswordHeading).toBeInTheDocument();

  const submitButton = await screen.findByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();

  const emailInput = await screen.findByRole('textbox', {
    name: /email address/i,
  });
  expect(emailInput).toBeInTheDocument();
});
