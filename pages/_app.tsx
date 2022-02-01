import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { NextPageWithoutAuth, UserPreferences } from '../types';

type ComponentPropsWithoutAuth = AppProps & {
  Component: NextPageWithoutAuth;
};

// Why userPreferences in app.tsx?
// B/c userPreferences like sleep timings and no of blocks per hour will change the application. So better to store it as context
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

function MyApp({ Component, pageProps }: ComponentPropsWithoutAuth) {
  const [userPreferences, setUserPreferences] = useState(
    initialUserPreferences
  );

  if (Component.protectedRoute === false) {
    return <Component {...pageProps} />;
  } else {
    <UserPreferencesContext.Provider
      value={{
        userPreferences: userPreferences,
        setUserPreferences: setUserPreferences,
      }}
    >
      <Component {...pageProps} />
    </UserPreferencesContext.Provider>;
  }
}

export default MyApp;
