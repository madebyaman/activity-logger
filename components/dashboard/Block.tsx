import { Activity } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';

import { useActivities } from '@/utils';
import { ActivityTypes } from '@/types';
import { ModalContext } from '@/components/modal';

export const blockTypeColors = {
  Neutral: 'bg-gray-500',
  Productive: 'bg-green-300',
  'Very Productive': `bg-green-600`,
  Distracting: `bg-orange-400`,
  'Very Distracting': `bg-red-700`,
};

export const Block = ({
  activityId,
  id,
  notes,
}: {
  activityId: number | null;
  id: number;
  notes: string;
}) => {
  const [activity, setActivity] = useState<Activity | undefined>();
  const { activities } = useActivities();
  const { modalState: modal, setModalState: setModal } =
    useContext(ModalContext);

  const handleClick = () => {
    if (!setModal) return;
    setModal({
      showModal: true,
      activity,
      currentBlockId: id,
      notes,
    });
  };

  useEffect(() => {
    if (activityId && activities) {
      const selectedActivity = activities.find(
        (activity) => activity.id === activityId
      );
      setActivity(selectedActivity);
    }
  }, [activities, activityId]);
  const name = activity?.name;
  const type = activity?.type as ActivityTypes;

  return (
    <button
      className="inline-flex items-center px-3 py-2 rounded"
      onClick={handleClick}
    >
      {activity ? (
        <>
          <span
            className={`w-3 h-3 mr-2 inline-block rounded-full ${blockTypeColors[type]}`}
          ></span>
          <span className="font-display text-gray-700">{name}</span>
        </>
      ) : (
        <span className="font-display text-gray-700">No activity</span>
      )}
    </button>
  );
};
