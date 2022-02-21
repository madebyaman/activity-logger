import { atom } from 'recoil';

type DefaultState = {
  message: string;
  title: string;
  type: 'error' | 'warning' | 'success';
};

const defaultState: DefaultState[] = [];

export const flashMessageState = atom({
  key: 'flashMessageState',
  default: defaultState,
});
