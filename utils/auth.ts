// fetcher will send a 'GET' or 'POST' depending on if data is present or not.
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
  });
}

// Auth will get 2 props. Signin, signup string. Then send over email, password, signin | signup to fetcher.
export const auth = (
  mode: 'signin' | 'signup',
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
