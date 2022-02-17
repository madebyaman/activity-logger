import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { BlocksPerHourType, UserPreferences } from '../types';
import { useProfile } from '../utils/hooks';

const initialUserPreferences: UserPreferences = {
  sleepFrom: 20,
  sleepTo: 6,
  blocksPerHour: 4,
};

export const UserPreferencesContext = createContext<{
  userPreferences: UserPreferences;
  setUserPreferences?: Dispatch<SetStateAction<UserPreferences>>;
}>({
  userPreferences: initialUserPreferences,
});

export default function ProfileContext({ children }: { children: ReactNode }) {
  const [userPreferences, setUserPreferences] = useState(
    initialUserPreferences
  );
  const { profile } = useProfile();

  useEffect(() => {
    if (profile) {
      setUserPreferences({
        sleepFrom: profile.sleepFrom,
        sleepTo: profile.sleepTo,
        blocksPerHour: profile.blocksPerHour as BlocksPerHourType,
      });
    }
  }, [profile]);

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences, setUserPreferences }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}
