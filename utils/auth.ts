import { AuthSigninProps, AuthSignupProps } from '../types';
import { fetcher } from './fetcher';

// Auth will get 2 props. Signin, signup string. Then send over email, password, signin | signup to fetcher.
export const auth = ({ mode, body }: AuthSigninProps | AuthSignupProps) => {
  return fetcher(`/${mode}`, body);
};
