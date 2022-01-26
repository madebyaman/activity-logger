import { FormEvent, useState } from 'react';
import { ActivityOption, ActivityType } from '../types';

const NewActivityModal = ({
  activity,
  onSubmit,
}: {
  activity: string;
  onSubmit: (newVal: ActivityOption) => void;
}) => {
  const [activityName, setActivityName] = useState(activity);
  const [activityType, setActivityType] = useState<ActivityType>('Neutral');

  const activityTypeOptions: ActivityType[] = [
    'Neutral',
    'Productive',
    'Very Productive',
    'Distracting',
    'Very Distracting',
  ];

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit inputs
    // Hide modal
    onSubmit({ name: activityName, type: activityType });
    // Clear inputs
    setActivityName('');
    setActivityType('Neutral');
  };

  return (
    <div>
      <div className="fixed top-0 right-1/3 left-0 bg-black bottom-0 opacity-50"></div>
      <div className="fixed top-0 left-2/3 overflow-y-hidden z-10 right-0 bottom-0 bg-white">
        <div className="mt-12 px-5">
          <h3 className="text-3xl uppercase font-bold">Create new activity</h3>
          <form onSubmit={submitForm}>
            <label className="uppercase font-light mt-5 block">
              Activity Name:
              <input
                className="block bg-gray-200 mt-1 mb-5 outline-0 appearance-none border border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="name"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
              />
            </label>
            <label
              htmlFor="activitySelector"
              className="uppercase font-light mt-5 block"
            >
              Type of activity:
            </label>
            <select
              id="activitySelector"
              value={activityType}
              className="mt-1 mb-5 block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => setActivityType(e.target.value as ActivityType)}
            >
              {activityTypeOptions.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
            <button
              className="bg-gray-500 uppercase hover:bg-gray-700 text-white py-3 px-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewActivityModal;
