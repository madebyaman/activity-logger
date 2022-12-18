import { act, render, screen } from '@testing-library/react';
import Preferences from '../pages/preferences';
import mockRouter from 'next-router-mock';
import { UserPreferencesForm } from '../components/user/preferencesForm';

jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

test('User preferences page shows the preferences form', async () => {
  jest.mock('next/router', () => require('next-router-mock'));
  await act(() => {
    render(<Preferences />);
  });
  const heading = await screen.findByRole('heading', { name: /profile/i });
  expect(heading).toBeInTheDocument();
});

test('User preferences form shows the preferences correctly', async () => {
  const profile = {
    sleepFrom: 22,
    sleepTo: 6,
    blocksPerHour: 4,
    firstName: 'Aman',
    lastName: 'Thakur',
    isVerified: true,
  };
  render(
    <UserPreferencesForm
      onSubmit={jest.fn()}
      profile={profile}
      formSubmitting={false}
      updateState={jest.fn()}
    />
  );

  const firstNameInput = await screen.findByRole('textbox', {
    name: /first name/i,
  });
  if (firstNameInput instanceof HTMLInputElement) {
    expect(firstNameInput.value).toEqual(profile.firstName);
  }

  const lastNameInput = await screen.findByRole('textbox', {
    name: /last name/i,
  });
  if (lastNameInput instanceof HTMLInputElement) {
    expect(lastNameInput.value).toEqual(profile.lastName);
  }

  const blocksPerHourSelect = await screen.findByRole('combobox', {
    name: /blocks per hour/i,
  });
  if (blocksPerHourSelect instanceof HTMLSelectElement) {
    expect(Number(blocksPerHourSelect.value)).toEqual(profile.blocksPerHour);
  }
});
