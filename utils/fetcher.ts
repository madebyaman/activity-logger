import { ActivityType } from '../types';

type AddActivityData = {
  name: string;
  type: ActivityType;
};

type UpdateLog = {
  blockId: number;
  activityId: number;
};
/**
 * Wrapper of native `fetch` function. It returns data or an error.
 */
export async function fetcher(
  url: string,
  data:
    | AddActivityData
    | UpdateLog
    | { email: string; password: string }
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
  if (res.status >= 200 && res.status <= 299) {
    /**
     * Successful responses are only between 200 - 299
     * URL: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     */
    return await res.json();
  }
}
