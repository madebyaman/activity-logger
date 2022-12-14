import { screen, render } from '@testing-library/react';
import Signup from '../pages/signup';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/initial');
});

test('Signup component is rendering', () => {
  render(<Signup />);
  jest.mock('next/router', () => require('next-router-mock'));
  const signinLink = screen.getByRole('link', {
    name: /sign in to your account/i,
  });
  if (signinLink instanceof HTMLLinkElement) {
    expect(signinLink.href).toContain('signin');
  }

  const signupButton = screen.getByRole('button', { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();

  const emailInput = screen.getByRole('textbox', { name: /email address/i });
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});
