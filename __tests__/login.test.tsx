import { screen, render } from '@testing-library/react';
import Signin from '../pages/signin';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/initial');
});

test('Login component is rendering', async () => {
  render(<Signin />);
  jest.mock('next/router', () => require('next-router-mock'));
  const signupLink = await screen.findByRole('link', {
    name: /create a new account/i,
  });
  if (signupLink instanceof HTMLLinkElement) {
    expect(signupLink.href).toContain('signup');
  }

  const loginButton = await screen.findByRole('button', { name: /sign in/i });
  expect(loginButton).toBeInTheDocument();

  const emailInput = await screen.findByRole('textbox', {
    name: /email address/i,
  });
  expect(emailInput).toBeInTheDocument();

  const passwordInput = await screen.findByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});
