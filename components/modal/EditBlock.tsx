import { useRecoilState } from 'recoil';
import { flashMessageState } from '../FlashMessage/flashMessageState';

import { modalState } from './modalState';
import {
  defaultButtonClasses,
  labelClasses,
  selectClasses,
  SlideOver,
} from '../ui';
import { updateBlock } from '../dashboard/utils';
import { useActivities } from '../dashboard/useActivities';
import { useBlocks } from '../dashboard/useBlocks';
import { useSWRConfig } from 'swr';
import { FormEvent } from 'react';

export const EditBlock = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [flashMessages, setFlashMessages] = useRecoilState(flashMessageState);
  const { activities } = useActivities();
  const { blocks } = useBlocks();
  const { mutate } = useSWRConfig();

  /**
   * It updates 'blockState' when a new activity is selected.
   */
  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modal.currentBlockId) return;

    // 1. Update local state
    if (modal.activity) {
      updateLocalBlock(modal.activity.id, modal.notes);
    }

    try {
      if (modal.activity) {
        await updateBlock(modal.currentBlockId, modal.activity.id, modal.notes);
        mutate('/api/blocks');
      }
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
    } finally {
      setModal({ ...modal, showModal: false });
    }
  };

  /**
   * This function updates the local state with the `activityId`
   */
  const updateLocalBlock = (activityId: number | null, notes: string = '') => {
    const newBlocks = blocks.map((block) => {
      if (block.id === modal.currentBlockId) {
        return {
          ...block,
          activityId,
          notes,
        };
      } else {
        return block;
      }
    });
    mutate('/api/blocks', newBlocks, false);
  };

  if (!modal.showModal) return null;

  return (
    <SlideOver
      title="Edit Block"
      onClose={() => setModal({ ...modal, showModal: false })}
    >
      <form onSubmit={update}>
        <select
          className={selectClasses}
          value={modal.activity?.id || undefined}
          onChange={(e) =>
            setModal({
              ...modal,
              activity: activities.find((a) => a.id === +e.target.value),
            })
          }
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
          value={modal.notes || ''}
          onChange={(e) =>
            setModal({
              ...modal,
              notes: e.target.value,
            })
          }
          className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button type="submit" className={defaultButtonClasses}>
          Submit
        </button>
      </form>
    </SlideOver>
  );
};
