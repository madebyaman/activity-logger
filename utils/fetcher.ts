import {
  ActivityTypes,
  SigninProps,
  SignupProps,
  UserPreferences,
} from '../types';

type UpdateLog = {
  blockId: number;
  activityId: number;
  notes: string;
};

type AddActivity = {
  type: ActivityTypes;
  name: string;
};

/**
 * Wrapper of native `fetch` function. It returns data or an error.
 */
export async function fetcher(
  url: string,
  data:
    | UserPreferences
    | UpdateLog
    | SigninProps
    | SignupProps
    | AddActivity
    | undefined = undefined
) {
  const res = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}
