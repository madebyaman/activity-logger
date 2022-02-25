import { Activity } from '@prisma/client';
import { atom } from 'recoil';

const defaultActivities: Activity[] = [];

export const activitiesState = atom({
  key: 'activitiesState',
  default: defaultActivities,
});
