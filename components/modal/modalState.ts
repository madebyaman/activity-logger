import { Activity } from '@prisma/client';
import { atom } from 'recoil';

type ModalStateType = {
  showModal: boolean;
  notes: string;
  currentBlockId?: number;
  activity?: Activity;
};

const defaultModalState: ModalStateType = {
  notes: '',
  showModal: false,
};

export const modalState = atom({
  key: 'modalState',
  default: defaultModalState,
});
