import { FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';

import { ActivityTypes } from '../../types';
import { addActivity } from '../../utils';
import { flashMessageState } from '../FlashMessage/flashMessageState';
import {
  defaultButtonClasses,
  inputClasses,
  labelClasses,
  outlineButtonClasses,
  selectClasses,
} from '../ui';

const activityTypeOptions = [
  'Neutral',
  'Productive',
  'Very Productive',
  'Distracting',
  'Very Distracting',
];

export const AddActivity = ({ changeTab }: { changeTab: () => void }) => {
  const [activityType, setActivityType] = useState<ActivityTypes | undefined>();
  const [activityName, setActivityName] = useState('');
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const [flashMessages, setFlashMessages] = useRecoilState(flashMessageState);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addActivity({
        name: activityName,
        type: activityType || 'Neutral',
      });
    } catch (e) {
      setFlashMessages([
        ...flashMessages,
        {
          title: 'Error adding new activity',
          message:
            'Something went wrong. There was an network error while adding new activity. Please try again.',
          type: 'error',
        },
      ]);
    } finally {
      setLoading(false);
      mutate('/activities');
      changeTab();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label className={labelClasses + ' sr-only'} htmlFor="activity-name">
          Activity name
        </label>
        <input
          id="activity-name"
          name="activity-name"
          className={inputClasses}
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Activity name"
          type="text"
        />
        <select
          className={selectClasses + ' my-4'}
          value={activityType}
          onChange={(e) => setActivityType(e.target.value as ActivityTypes)}
        >
          <option value="">Type of activity</option>
          {activityTypeOptions.map((activity) => (
            <option key={activity}>{activity}</option>
          ))}
        </select>
        <div className="flex">
          <button
            type="submit"
            disabled={loading}
            className={defaultButtonClasses}
          >
            Submit activity
          </button>
          <button
            className={outlineButtonClasses + ' ml-4'}
            onClick={changeTab}
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};
