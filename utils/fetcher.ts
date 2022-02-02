/**
 * Wrapper of native `fetch` function. It returns data or an error.
 * @param url URL of the api route
 * @param data data to pass. If no data, then request will be `GET`.
 * @returns An error or data returned from api route in JSON format
 */
export function fetcher(
  url: string,
  data: { email: string; password: string } | undefined = undefined
) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status > 200 && res.status < 299) {
      /**
       * Successful responses are only between 200 - 299
       * URL: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       */
      return res.json();
    }
    throw new Error();
  });
}
