import { screen, render } from '@testing-library/react';
import Signup from '../pages/signup';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/initial');
});

test('Signup component is rendering', async () => {
  render(<Signup />);
  jest.mock('next/router', () => require('next-router-mock'));
  const signinLink = await screen.findByRole('link', {
    name: /sign in to your account/i,
  });
  if (signinLink instanceof HTMLLinkElement) {
    expect(signinLink.href).toContain('signin');
  }

  const signupButton = await screen.findByRole('button', { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();

  const emailInput = await screen.findByRole('textbox', {
    name: /email address/i,
  });
  expect(emailInput).toBeInTheDocument();

  const passwordInput = await screen.findByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});
