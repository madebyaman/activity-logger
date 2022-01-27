import { NextPage } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import { BlocksPerHour, UserPreferences } from '../types';
import { UserPreferencesContext } from './_app';

const UserPreferences: NextPage = () => {
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
          value={userPreferences.noOfBlocksPerHour}
          onChange={(e) =>
            setUserPreferences({
              ...userPreferences,
              noOfBlocksPerHour: +e.target.value as BlocksPerHour,
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

export default UserPreferences;
