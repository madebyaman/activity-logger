import { NextPage } from 'next';

export type ActivityType =
  | 'Neutral'
  | 'Productive'
  | 'Very Productive'
  | 'Distracting'
  | 'Very Distracting';

export type ActivitySelect = {
  label: string;
  type: ActivityType;
  value: number;
};

export type BlocksPerHourType = 1 | 2 | 4;

export type UserPreferences = {
  sleepFrom: number;
  sleepTo: number;
  blocksPerHour: BlocksPerHourType;
};

export type NextPageWithAuth = NextPage & {
  protectedRoute: Boolean;
};
