import { Dispatch, SetStateAction } from 'react';
import { convertNumberToHour } from '@/utils';
import {
  defaultButtonClasses,
  disabledButtonClasses,
  inputClasses,
  labelClasses,
  selectClasses,
} from '../ui';

type ProfileState = {
  firstName: string;
  lastName: string;
  sleepFrom: number;
  sleepTo: number;
  blocksPerHour: number;
};

type UserPreferencesFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  profile: ProfileState;
  formSubmitting: boolean;
  updateState: Dispatch<
    SetStateAction<
      | ProfileState
      | {
          blocksPerHour: number;
          sleepFrom: number;
          sleepTo: number;
          firstName: string;
          lastName: string;
        }
    >
  >;
};

type HourOption = {
  value: number;
  label: string;
};

export function UserPreferencesForm({
  onSubmit,
  profile,
  formSubmitting,
  updateState,
}: UserPreferencesFormProps) {
  const { firstName, lastName, blocksPerHour, sleepFrom, sleepTo } = profile;

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

  return (
    <form onSubmit={onSubmit}>
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
                value={firstName}
                onChange={(e) =>
                  updateState({ ...profile, firstName: e.target.value })
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
                value={lastName}
                onChange={(e) =>
                  updateState({ ...profile, lastName: e.target.value })
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
                value={blocksPerHour}
                onChange={(e) =>
                  updateState({
                    ...profile,
                    blocksPerHour: Number(e.target.value),
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
                value={sleepFrom}
                onChange={(e) =>
                  updateState({ ...profile, sleepFrom: Number(e.target.value) })
                }
                className={selectClasses}
              >
                {hourOptions.sort(SortHoursByIncreasingOrder).map((hour) => (
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
                value={sleepTo}
                onChange={(e) =>
                  updateState({ ...profile, sleepTo: Number(e.target.value) })
                }
                className={selectClasses}
              >
                {hourOptions.sort(sortHoursByDecreasingOrder).map((hour) => (
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
              formSubmitting ? disabledButtonClasses : defaultButtonClasses
            }
          >
            {!formSubmitting ? 'Save' : 'Saving...'}
          </button>
        </div>
      </div>
    </form>
  );
}
