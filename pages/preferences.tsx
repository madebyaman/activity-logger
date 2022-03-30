import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useSWRConfig } from 'swr';
import { FlashMessageContext } from '../components/FlashMessage';
import {
  defaultButtonClasses,
  disabledButtonClasses,
  h3Classes,
  inputClasses,
  labelClasses,
  selectClasses,
} from '../components/ui';
import { BlocksPerHourType, NextPageWithAuth } from '../types';
import { convertNumberToHour, fetcher, useProfile } from '../utils';

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
  const { profile } = useProfile();
  const [profileState, setProfileState] = useState({
    blocksPerHour: profile.blocksPerHour as BlocksPerHourType,
    sleepFrom: profile.sleepFrom,
    sleepTo: profile.sleepTo,
    firstName: profile.firstName,
    lastName: profile.lastName,
  });
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { setFlashMessages } = useContext(FlashMessageContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetcher('/profile/update', profileState);
      router.push('/dashboard');
    } catch {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Error',
            message:
              'Something went wrong while saving your profile. Please try again.',
            type: 'error',
          },
        ]);
    } finally {
      setLoading(false);
      mutate('/profile');
    }
  };

  return (
    <div>
      <Head>
        <title>User preferences</title>
      </Head>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className={h3Classes + ' font-display'}>Profile</h2>
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
                      <label htmlFor="first-name" className={labelClasses}>
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        value={profileState.firstName || ''}
                        onChange={(e) =>
                          setProfileState({
                            ...profileState,
                            firstName: e.target.value,
                          })
                        }
                        className={inputClasses}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className={labelClasses}>
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        value={profileState.lastName || ''}
                        onChange={(e) =>
                          setProfileState({
                            ...profileState,
                            lastName: e.target.value,
                          })
                        }
                        className={inputClasses}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="blocks" className={labelClasses}>
                        Blocks per hour
                      </label>
                      <select
                        id="blocks"
                        name="blocks"
                        value={profileState.blocksPerHour}
                        onChange={(e) =>
                          setProfileState({
                            ...profileState,
                            blocksPerHour: parseInt(
                              e.target.value
                            ) as BlocksPerHourType,
                          })
                        }
                        className={selectClasses}
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
                      <label htmlFor="sleepFrom" className={labelClasses}>
                        Sleep from
                      </label>
                      <select
                        id="sleepFrom"
                        name="sleepFrom"
                        value={profileState.sleepFrom}
                        onChange={(e) =>
                          setProfileState({
                            ...profileState,
                            sleepFrom: Number(e.target.value),
                          })
                        }
                        className={selectClasses}
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
                      <label htmlFor="sleepTo" className={labelClasses}>
                        Sleep to
                      </label>
                      <select
                        id="sleepTo"
                        name="sleepTo"
                        value={profileState.sleepTo}
                        onChange={(e) =>
                          setProfileState({
                            ...profileState,
                            sleepTo: Number(e.target.value),
                          })
                        }
                        className={selectClasses}
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
                    className={
                      loading ? disabledButtonClasses : defaultButtonClasses
                    }
                  >
                    {!loading ? 'Save' : 'Saving...'}
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
