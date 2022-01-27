export type ActivityType =
  | 'Neutral'
  | 'Productive'
  | 'Very Productive'
  | 'Distracting'
  | 'Very Distracting';

export type Activity = {
  label: string;
  type: ActivityType;
  value: string;
};

export type TimeLog = {
  from: Date;
  to: Date;
  activity?: Activity;
  block: number;
  blockId: string;
  hour: number;
  lastUpdated?: Date;
};

export type BlocksPerHour = 1 | 2 | 4;

export type UserPreferences = {
  sleepFrom: number;
  sleepTo: number;
  noOfBlocksPerHour: BlocksPerHour;
};
