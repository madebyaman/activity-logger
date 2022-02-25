import { Activity } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { activitiesState } from '../activities';

export const blockTypeColors = {
  Neutral: 'bg-gray-500',
  Productive: 'bg-green-300',
  'Very Productive': `bg-green-600`,
  Distracting: `bg-orange-400`,
  'Very Distracting': `bg-red-700`,
};

export const ShowBlock = ({
  activityId,
  id,
}: {
  activityId: number | null;
  id: number;
}) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const activities = useRecoilValue(activitiesState);

  useEffect(() => {
    if (activityId) {
      const selectedActivity = activities.find(
        (activity) => activity.id === activityId
      );
      setActivity(selectedActivity || null);
    }
  }, [activities, activityId]);

  if (!activity) return <a>No activity</a>;
  return (
    <a>
      <span
        className={`w-3 h-3 mr-2 inline-block rounded-full ${
          blockTypeColors[activity.type]
        }`}
      ></span>
      <span>{activity.name}</span>
    </a>
  );
};
