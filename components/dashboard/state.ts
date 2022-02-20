import { Log } from '@prisma/client';
import { atom } from 'recoil';
import { ActivitySelect } from '../../types';

const defaultActivities: ActivitySelect[] = [];

export const activitiesState = atom({
  key: 'activitiesState',
  default: defaultActivities,
});

const defaultBlocks: Log[] = [];

export const blockState = atom({
  key: 'blockState',
  default: defaultBlocks,
});

type ModalStateType = {
  showModal: boolean;
  name: string;
  currentBlockId?: number;
};

const defaultModalState: ModalStateType = {
  name: '',
  showModal: false,
};

export const modalState = atom({
  key: 'modalState',
  default: defaultModalState,
});
