import { render, screen } from '@testing-library/react';
import { ActivityRow } from '@/components/activity';
import { ShowActivity } from '@/components/activity';
import ActivitiesPage from '@/pages/activities';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { fakeActivities } from './__mocks__/fakeData/fakeActivities';
import { format, isValid, parse } from 'date-fns';
import { fakeBlocks } from './__mocks__/fakeData/fakeBlocks';
import { SWRConfig } from 'swr';

test('Activity Row shows the correct activity', async () => {
  const Activity = {
    id: 19323,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Workout',
    type: 'Neutral',
    userId: 2383,
  };
  const user = userEvent.setup();
  render(
    <table>
      <tbody>
        <ActivityRow
          updateActivity={jest.fn()}
          onDelete={jest.fn()}
          activity={Activity}
          link={'?activity=2'}
        />
      </tbody>
    </table>
  );

  const activityRow = await screen.findByRole('cell', { name: /workout/i });
  expect(activityRow).toBeInTheDocument();

  // Check edit functionality
  const editButton = await screen.findByRole('button', {
    name: /edit/i,
  });
  user.click(editButton);

  const activityNameInput = (await screen.findByRole(
    'textbox'
  )) as HTMLInputElement;
  expect(activityNameInput.value).toEqual(Activity.name);
  const activityTypeSelect = (await screen.findByRole(
    'combobox'
  )) as HTMLSelectElement;
  expect(activityTypeSelect.value).toEqual(Activity.type);
});

jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

test('Activity page shows all the activities returned by server', async () => {
  render(<ActivitiesPage />);

  const rows = await screen.findAllByRole('cell');
  expect(rows.length).toEqual(3 * 4); // 3 items returned by mock fn, 4 cells in each row.
});

function formattedDateIfValid(date: string) {
  const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
  if (isValid(parsedDate)) return format(parsedDate, 'MMM d, Y');
}

test('Show activity component renders the log for current activity', async () => {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <ShowActivity activity={fakeActivities[1]} />
    </SWRConfig>
  );

  const heading = await screen.findByRole('heading', {
    name: formattedDateIfValid(fakeBlocks[0].date),
  });
  expect(heading).toBeInTheDocument();

  const nextButton = screen.getByTestId('next-logs') as HTMLButtonElement;
  expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  const previousButton = screen.getByTestId(
    'previous-logs'
  ) as HTMLButtonElement;
  expect(previousButton).toHaveAttribute('aria-disabled', 'true');
});
