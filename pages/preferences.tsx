import Link from 'next/link';
import { useContext } from 'react';
import { UserPreferencesContext } from '../components/ProfileContext';
import { BlocksPerHourType, NextPageWithAuth } from '../types';

/**
 * Some Ideas for Tomorrow:
 * 1. When sleepTo is very close, show a message like "Ghosh what are you sleepy head?"
 * 2. Push notification option
 */

const Preferences: NextPageWithAuth = () => {
  const { userPreferences, setUserPreferences } = useContext(
    UserPreferencesContext
  );

  const hourOptions = Array.from(Array(24).keys()).map((hour) => {
    const AMOrPM = hour >= 12 ? 'PM' : 'AM';
    const stringHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return {
      value: hour,
      label: `${stringHour} ${AMOrPM}`,
    };
  });

  if (!setUserPreferences) {
    return <div></div>;
  }

  return (
    <div>
      <p>Sleep Time:</p>
      <label>
        From:
        <select
          value={userPreferences.sleepFrom}
          onChange={(e) =>
            setUserPreferences({
              ...userPreferences,
              sleepFrom: +e.target.value,
            })
          }
        >
          {hourOptions
            .sort((a, b) => {
              if (a.value > b.value) return -1;
              if (a.value < b.value) return 1;
              return 0;
            })
            .map((hour) => (
              <option key={hour.value} value={hour.value}>
                {hour.label}
              </option>
            ))}
        </select>
      </label>
      <label>
        To:
        <select
          value={userPreferences.sleepTo}
          onChange={(e) =>
            setUserPreferences({
              ...userPreferences,
              sleepTo: +e.target.value,
            })
          }
        >
          {hourOptions
            .sort((a, b) => {
              if (a.value > b.value) return 1;
              if (a.value < b.value) return -1;
              return 0;
            })
            .map((hour) => (
              <option key={hour.value} value={hour.value}>
                {hour.label}
              </option>
            ))}
        </select>
      </label>
      <label>
        Number of Blocks Per Hour
        <select
          value={userPreferences.blocksPerHour}
          onChange={(e) =>
            setUserPreferences({
              ...userPreferences,
              blocksPerHour: +e.target.value as BlocksPerHourType,
            })
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </label>
      <Link href="/">
        <a>Go back</a>
      </Link>
    </div>
  );
};

Preferences.protectedRoute = false;

export default Preferences;
