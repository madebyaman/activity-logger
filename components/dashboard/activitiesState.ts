import { atom } from 'recoil';
import { ActivitySelect } from '../../types';

const defaultActivities: ActivitySelect[] = [];

export const activitiesState = atom({
  key: 'activitiesState',
  default: defaultActivities,
});
