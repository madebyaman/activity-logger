import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { inputClasses, selectClasses } from '../components/ui';
import { ActivityTypes, NextPageWithAuth } from '../types';
import { activityTypes, fetcher, useActivities } from '../utils';

// style activity type
function styledActivity(type: ActivityTypes) {
  switch (type) {
    case 'Neutral':
      return 'bg-gray-100 text-gray-800';
    case 'Productive':
      return 'bg-green-100 text-green-800';
    case 'Very Distracting':
      return 'bg-red-100 text-red-800';
    case 'Very Productive':
      return 'bg-teal-100 text-teal-800';
    case 'Distracting':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

type EditingActivityState = {
  id: number | null;
  type: ActivityTypes;
  name: string;
};

const Activities: NextPageWithAuth = () => {
  const [editingActivity, setEditingActivity] = useState<EditingActivityState>({
    id: null,
    type: 'Neutral',
    name: '',
  });
  const { isLoading, activities, isError } = useActivities();
  const { mutate } = useSWRConfig();

  const updateActivity = async () => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === editingActivity.id) {
        return {
          ...activity,
          type: editingActivity.type,
          name: editingActivity.name,
        };
      }
      return activity;
    });
    mutate('/activities', updatedActivities, false);
    await fetcher('/activities/update', editingActivity);
    setEditingActivity({
      id: null,
      type: 'Neutral',
      name: '',
    });
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
          {activities.map((activity) => {
            const isEditing = editingActivity.id === activity.id;
            return (
              <tr key={activity.id}>
                <td className={tdClasses}>
                  {isEditing ? (
                    <input
                      className={
                        inputClasses + ' text-sm font-medium text-gray-900'
                      }
                      value={editingActivity.name}
                      onChange={(e) =>
                        setEditingActivity({
                          ...editingActivity,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-900">
                      {activity.name}
                    </span>
                  )}
                </td>
                <td className={tdClasses}>
                  {isEditing ? (
                    <select
                      className={
                        selectClasses + ' text-sm font-medium text-gray-900'
                      }
                      value={editingActivity.type}
                      onChange={(e) =>
                        setEditingActivity({
                          ...editingActivity,
                          type: e.target.value as ActivityTypes,
                        })
                      }
                    >
                      <option>Type of activity</option>
                      {activityTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styledActivity(
                        activity.type as ActivityTypes
                      )}`}
                    >
                      {activity.type}
                    </span>
                  )}
                </td>
                {isEditing ? (
                  <td className={tdClasses}>
                    <button onClick={updateActivity}>Save</button>
                  </td>
                ) : (
                  <td className={tdClasses}>
                    <button
                      onClick={() =>
                        setEditingActivity({
                          type: activity.type as ActivityTypes,
                          name: activity.name,
                          id: activity.id,
                        })
                      }
                    >
                      Edit
                    </button>
                  </td>
                )}
                <td className={tdClasses}>{!isEditing ? 'Delete' : null}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

Activities.protectedRoute = true;

export default Activities;
