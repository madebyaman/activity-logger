export type ActivityType =
  | 'Neutral'
  | 'Productive'
  | 'Very Productive'
  | 'Distracting'
  | 'Very Distracting';

export type ActivityOption = {
  name: string;
  type: ActivityType;
};

export type TimeLog = {
  from: Date;
  to: Date;
  activity?: ActivityOption;
  hour: number;
  block: number;
};
