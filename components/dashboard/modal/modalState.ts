import { atom } from 'recoil';

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
