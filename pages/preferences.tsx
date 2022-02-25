import { useContext } from 'react';
import { useRecoilState } from 'recoil';
import { profileState } from '../components/user';
import { BlocksPerHourType, NextPageWithAuth } from '../types';
import { convertNumberToHour, fetcher } from '../utils';

type HourOption = {
  value: number;
  label: string;
};

const SortHoursByIncreasingOrder = (a: HourOption, b: HourOption) => {
  if (a.value > b.value) return -1;
  if (a.value < b.value) return 1;
  return 0;
};

const sortHoursByDecreasingOrder = (a: HourOption, b: HourOption) => {
  if (a.value < b.value) return -1;
  if (a.value > b.value) return 1;
  return 0;
};

/**
 * Returns array of {value, label} of all hour options.
 */
const hourOptions = Array.from(Array(24).keys()).map((hour) => {
  return {
    value: hour,
    label: convertNumberToHour(hour),
  };
});

const Preferences: NextPageWithAuth = () => {
  const [userPreferences, setUserPreferences] = useRecoilState(profileState);
  const { sleepFrom, sleepTo, blocksPerHour, firstName, lastName } =
    userPreferences;

  if (!setUserPreferences) {
    return <div></div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetcher('/profile/update', userPreferences);
  };

  return (
    <div>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This is your personal information. It will be used to improve
                your app experience.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow border border-gray-50 sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        value={firstName || ''}
                        onChange={(e) =>
                          setUserPreferences({
                            ...userPreferences,
                            firstName: e.target.value,
                          })
                        }
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 bg-white border"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        value={lastName || ''}
                        onChange={(e) =>
                          setUserPreferences({
                            ...userPreferences,
                            lastName: e.target.value,
                          })
                        }
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 bg-white border"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="blocks"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Blocks per hour
                      </label>
                      <select
                        id="blocks"
                        name="blocks"
                        value={blocksPerHour}
                        onChange={(e) =>
                          setUserPreferences({
                            ...userPreferences,
                            blocksPerHour: parseInt(
                              e.target.value
                            ) as BlocksPerHourType,
                          })
                        }
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>4</option>
                      </select>
                    </div>

                    <div className="col-span-6 mt-2">
                      <legend className="text-base font-medium text-gray-900">
                        Sleep Timings
                      </legend>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="sleepFrom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Sleep from
                      </label>
                      <select
                        id="sleepFrom"
                        name="sleepFrom"
                        value={sleepFrom}
                        onChange={(e) =>
                          setUserPreferences({
                            ...userPreferences,
                            sleepFrom: Number(e.target.value),
                          })
                        }
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {hourOptions
                          .sort(SortHoursByIncreasingOrder)
                          .map((hour) => (
                            <option key={hour.value} value={hour.value}>
                              {hour.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="sleepTo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Sleep to
                      </label>
                      <select
                        id="sleepTo"
                        name="sleepTo"
                        value={sleepTo}
                        onChange={(e) =>
                          setUserPreferences({
                            ...userPreferences,
                            sleepTo: Number(e.target.value),
                          })
                        }
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {hourOptions
                          .sort(sortHoursByDecreasingOrder)
                          .map((hour) => (
                            <option key={hour.value} value={hour.value}>
                              {hour.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Preferences.protectedRoute = true;

export default Preferences;
