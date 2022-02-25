import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activitiesState } from '../activities';
import { flashMessageState } from '../FlashMessage/flashMessageState';
import { labelClasses, selectClasses, SlideOver } from '../ui';
import { blockState } from './blockState';
import { updateBlock } from './utils';

type EditBlockProps = {
  id: number;
  activityId: number | null;
};

export const EditBlock = ({ id, activityId }: EditBlockProps) => {
  const activities = useRecoilValue(activitiesState);
  const [selectedActivity, setSelectedActivity] = useState<number | undefined>(
    undefined
  );
  const [blocks, setBlocks] = useRecoilState(blockState);
  const [flashMessages, setFlashMessages] = useRecoilState(flashMessageState);
  const [currentBlockNote, setCurrentBlockNote] = useState('');

  useEffect(() => {
    if (id) {
      const selectedBlock = blocks.find((block) => block.id === id);
      setCurrentBlockNote(selectedBlock?.notes || '');
    }
  }, [id]);

  useEffect(() => {
    if (activityId) {
      const matchedActivity = activities.find(
        (activity) => activity.id === activityId
      );
      setSelectedActivity(matchedActivity?.id);
    }
  }, [activities, activityId]);

  /**
   * It updates 'blockState' when a new activity is selected.
   */
  const update = async (activityId: number, notes: string = '') => {
    // 1. Update local state
    updateLocalBlock(activityId, notes);

    try {
      await updateBlock(id, activityId, notes);
    } catch (e) {
      // 1. Show warning flash message
      setFlashMessages([
        ...flashMessages,
        {
          title: 'Error updating block',
          message:
            'Something went wrong. There was an network error while updating the block. Please try again.',
          type: 'warning',
        },
      ]);
      //2. Reset the local state
      updateLocalBlock(null, '');
    }
  };

  /**
   * This function updates the local state with the `activityId`
   */
  const updateLocalBlock = (activityId: number | null, notes: string = '') => {
    const newBlocks = blocks.map((block) => {
      if (block.id === id) {
        return {
          ...block,
          activityId,
          notes,
        };
      } else {
        return block;
      }
    });
    setBlocks(newBlocks);
  };

  return (
    <SlideOver title="Edit Block">
      <form>
        <select
          className={selectClasses}
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(Number(e.target.value))}
        >
          <option value="">Select an activity</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
        <label className={labelClasses} htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={currentBlockNote || ''}
          onChange={(e) => setCurrentBlockNote(e.target.value)}
          className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button type="submit">Submit</button>
      </form>
    </SlideOver>
  );
};
