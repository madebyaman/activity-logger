import { Activity as ActivityType } from '@prisma/client';
import { useSWRConfig } from 'swr';
import { Activity } from '../components/Activity';
import { ActivityTypes, NextPageWithAuth } from '../types';
import { fetcher, useActivities } from '../utils';

const Activities: NextPageWithAuth = () => {
  const { isLoading, activities, isError } = useActivities();
  const { mutate } = useSWRConfig();

  const updateActivity = async ({
    id,
    name,
    type,
  }: {
    id: number;
    name: string;
    type: ActivityTypes;
  }) => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === id) {
        return {
          ...activity,
          type: type,
          name: name,
        };
      }
      return activity;
    });
    mutate('/activities', updatedActivities, false);
    await fetcher('/activities/update', { id, name, type });
    mutate('/activities');
  };

  const deleteActivity = async (id: number) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    mutate('/activities', updatedActivities, false);
    await fetcher('/activities/delete', { id });
    mutate('/activities');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const thClasses =
    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
  const tdClasses = 'px-6 py-4 whitespace-no-wrap';

  const sortActivitiesById = (a: ActivityType, b: ActivityType) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className={thClasses}>Activity Name</th>
            <th className={thClasses}>Activity Type</th>
            <th className={thClasses}>Edit</th>
            <th className={thClasses}>Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.length &&
            activities
              .sort(sortActivitiesById)
              .map((activity) => (
                <Activity
                  key={activity.id}
                  activity={activity}
                  updateActivity={updateActivity}
                  onDelete={deleteActivity}
                />
              ))}
        </tbody>
      </table>
    </>
  );
};

Activities.protectedRoute = true;

export default Activities;
