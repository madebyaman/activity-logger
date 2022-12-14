import { screen, render } from '@testing-library/react';
import Signin from '../pages/signin';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/initial');
});

test('Login component is rendering', () => {
  render(<Signin />);
  jest.mock('next/router', () => require('next-router-mock'));
  const signupLink = screen.getByRole('link', {
    name: /create a new account/i,
  });
  if (signupLink instanceof HTMLLinkElement) {
    expect(signupLink.href).toContain('signup');
  }

  const loginButton = screen.getByRole('button', { name: /sign in/i });
  expect(loginButton).toBeInTheDocument();

  const emailInput = screen.getByRole('textbox', { name: /email address/i });
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});
