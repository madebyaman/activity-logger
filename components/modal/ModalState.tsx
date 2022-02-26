import { Activity } from '@prisma/client';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type ModalState = {
  showModal: boolean;
  notes: string;
  currentBlockId?: number;
  activity?: Activity;
};

interface ModalContextInterface {
  modalState: ModalState;
  setModalState?: Dispatch<SetStateAction<ModalState>>;
}

const defaultModalState = {
  notes: '',
  showModal: false,
};

export const ModalContext = createContext<ModalContextInterface>({
  modalState: defaultModalState,
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>(defaultModalState);

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      {children}
    </ModalContext.Provider>
  );
};
