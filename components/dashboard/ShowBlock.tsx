import { Activity } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activitiesState } from '../activities';
import { modalState } from '../modal/modalState';
import { EditBlock } from './EditBlock';

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
  notes,
}: {
  activityId: number | null;
  id: number;
  notes: string;
}) => {
  const [activity, setActivity] = useState<Activity | undefined>();
  const [showSlideOver, setSlideOver] = useState(false);
  const activities = useRecoilValue(activitiesState);
  const [modal, setModal] = useRecoilState(modalState);

  const handleClick = () => {
    setModal({
      showModal: true,
      activity,
      currentBlockId: id,
      notes,
    });
  };

  useEffect(() => {
    if (activityId) {
      const selectedActivity = activities.find(
        (activity) => activity.id === activityId
      );
      setActivity(selectedActivity);
    }
  }, [activities, activityId]);

  return (
    <button className="flex flex-col" onClick={handleClick}>
      {activity ? (
        <>
          <span
            className={`w-3 h-3 mr-2 inline-block rounded-full ${
              blockTypeColors[activity.type]
            }`}
          ></span>
          <span>{activity.name}</span>
        </>
      ) : (
        'No activity'
      )}
      {showSlideOver && <EditBlock id={id} activityId={activityId} />}
    </button>
  );
};
