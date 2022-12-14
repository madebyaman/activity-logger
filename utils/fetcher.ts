import axios from 'axios';
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

interface EditActivity extends AddActivity {
  id: number;
}

type DeleteActivity = {
  id: number;
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
    | EditActivity
    | DeleteActivity
    | undefined = undefined
) {
  if (data) {
    return await axios.post(`${window.location.origin}/api${url}`, {
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } else {
    const res = await axios.get(`${window.location.origin}/api${url}`);
    return res.data;
  }
}
