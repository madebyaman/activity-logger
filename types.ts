import { NextPage } from 'next';

export type ActivityTypes =
  | 'Neutral'
  | 'Productive'
  | 'Very Productive'
  | 'Distracting'
  | 'Very Distracting';

export type BlocksPerHourType = 1 | 2 | 4;

export type UserPreferences = {
  sleepFrom: number;
  sleepTo: number;
  blocksPerHour: BlocksPerHourType;
  firstName: string | null;
  lastName: string | null;
};

export type NextPageWithAuth = NextPage & {
  protectedRoute: Boolean;
};

export type SigninProps = {
  email: string;
  password: string;
};

export type SignupProps = SigninProps & {
  firstName: string;
  lastName: string;
};

export type AuthSigninProps = {
  mode: 'signin';
  body: SigninProps;
};

export type AuthSignupProps = {
  mode: 'signup';
  body: SignupProps;
};
export type Report = {
  activityId: number;
  totalMinutes: number;
  activityName: string;
  activityType: string;
};
