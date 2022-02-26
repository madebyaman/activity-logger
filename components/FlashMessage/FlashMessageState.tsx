import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type FlashMessageState = {
  message: string;
  title: string;
  type: 'error' | 'warning' | 'success';
};

interface FlashMessageContext {
  flashMessages: FlashMessageState[];
  setFlashMessages?: Dispatch<SetStateAction<FlashMessageState[]>>;
}

export const FlashMessageContext = createContext<FlashMessageContext>({
  flashMessages: [],
});

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [flashMessages, setFlashMessages] = useState<FlashMessageState[]>([]);

  return (
    <FlashMessageContext.Provider value={{ flashMessages, setFlashMessages }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
