import { fetcher } from './fetcher';

// Auth will get 2 props. Signin, signup string. Then send over email, password, signin | signup to fetcher.
export const auth = (
  mode: 'signin' | 'signup',
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
