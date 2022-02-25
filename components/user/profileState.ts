import { atom } from 'recoil';
import { UserPreferences } from '../../types';

const initialUserPreferences: UserPreferences = {
  sleepFrom: 20,
  sleepTo: 6,
  blocksPerHour: 4,
  firstName: null,
  lastName: null,
};

export const profileState = atom({
  key: 'profileState',
  default: initialUserPreferences,
});
