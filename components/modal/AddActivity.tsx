import { FormEvent, useContext, useState } from 'react';
import { useSWRConfig } from 'swr';

import { ActivityTypes } from '../../types';
import { activityTypes, addActivity } from '../../utils';
import { FlashMessageContext } from '../FlashMessage';
import {
  defaultButtonClasses,
  inputClasses,
  labelClasses,
  outlineButtonClasses,
  selectClasses,
} from '../ui';

export const AddActivity = ({ changeTab }: { changeTab: () => void }) => {
  const [activityType, setActivityType] = useState<ActivityTypes | undefined>();
  const [activityName, setActivityName] = useState('');
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { setFlashMessages } = useContext(FlashMessageContext);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addActivity({
        name: activityName,
        type: activityType || 'Neutral',
      });
    } catch (e) {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
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
          {activityTypes.map((activity) => (
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
