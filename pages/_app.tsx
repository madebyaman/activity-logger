import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { UserPreferences } from '../types';

const initialUserPreferences: UserPreferences = {
  sleepFrom: 21,
  sleepTo: 6,
  noOfBlocksPerHour: 2,
};

export const UserPreferencesContext = createContext<{
  userPreferences: UserPreferences;
  setUserPreferences?: Dispatch<SetStateAction<UserPreferences>>;
}>({
  userPreferences: initialUserPreferences,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [userPreferences, setUserPreferences] = useState(
    initialUserPreferences
  );
  return (
    <UserPreferencesContext.Provider
      value={{
        userPreferences: userPreferences,
        setUserPreferences: setUserPreferences,
      }}
    >
      <Component {...pageProps} />
    </UserPreferencesContext.Provider>
  );
}

export default MyApp;
