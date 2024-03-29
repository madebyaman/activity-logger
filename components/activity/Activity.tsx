import { Activity as ActivityType } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import { ActivityTypes } from '@/types';
import { activityTypes } from '@/utils';
import { inputClasses, selectClasses } from '@/components/ui';

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

export const ActivityRow = ({
  activity,
  updateActivity,
  onDelete,
  link,
}: {
  activity: ActivityType;
  updateActivity: ({
    id,
    name,
    type,
  }: {
    id: number;
    name: string;
    type: ActivityTypes;
  }) => Promise<void>;
  link: string;
  onDelete: (id: number) => Promise<void>;
}) => {
  const [editingActivity, setEditingActivity] = useState({
    isEditing: false,
    name: activity.name,
    type: activity.type,
  });

  const onSave = () => {
    updateActivity({
      name: editingActivity.name,
      type: editingActivity.type as ActivityTypes,
      id: activity.id,
    });
    // Reset the 'editingActivity' state
    setEditingActivity({
      isEditing: false,
      name: activity.name,
      type: activity.type,
    });
  };

  const tdClasses = 'px-6 py-4 whitespace-no-wrap';
  const buttonClasses = 'text-sm font-medium';

  return (
    <tr>
      <td className={tdClasses}>
        {editingActivity.isEditing ? (
          <input
            className={inputClasses + ' text-sm font-medium text-gray-900'}
            value={editingActivity.name}
            onChange={(e) =>
              setEditingActivity({
                ...editingActivity,
                name: e.target.value,
              })
            }
          />
        ) : (
          <Link
            href={link}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {activity.name}
          </Link>
        )}
      </td>
      <td className={tdClasses}>
        {editingActivity.isEditing ? (
          <select
            className={selectClasses + ' text-sm font-medium text-gray-900'}
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
      {editingActivity.isEditing ? (
        <td className={tdClasses}>
          <button
            onClick={onSave}
            className={buttonClasses + ' text-green-700 hover:text-green-900'}
          >
            Save
          </button>
        </td>
      ) : (
        <td className={tdClasses}>
          <button
            className={buttonClasses + ' text-teal-600 hover:text-teal-900'}
            onClick={() =>
              setEditingActivity({
                type: activity.type as ActivityTypes,
                name: activity.name,
                isEditing: true,
              })
            }
          >
            Edit
          </button>
        </td>
      )}
      {editingActivity.isEditing ? null : (
        <td className={tdClasses}>
          <button
            onClick={() => onDelete(activity.id)}
            className={buttonClasses + ' text-red-700 hover:text-red-900'}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};
