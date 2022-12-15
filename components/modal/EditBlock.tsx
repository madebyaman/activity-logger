import { useSWRConfig } from 'swr';
import { MouseEvent, FormEvent, useContext } from 'react';

import {
  defaultButtonClasses,
  labelClasses,
  linkClasses,
  selectClasses,
} from '../ui';
import { useBlocks, useActivities, updateBlock } from '../../utils';
import { ModalContext } from '.';
import { FlashMessageContext } from '../FlashMessage';

export const EditBlock = ({
  changeTab,
}: {
  changeTab: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { modalState: modal, setModalState: setModal } =
    useContext(ModalContext);
  const { setFlashMessages } = useContext(FlashMessageContext);
  const { activities } = useActivities();
  const { blocks } = useBlocks();
  const { mutate } = useSWRConfig();

  /**
   * It updates 'blockState' when a new activity is selected.
   */
  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modal.currentBlockId) return;

    // 1. Immediately Update local state
    if (modal.activity) {
      updateLocalBlock(modal.activity.id, modal.notes);
    }
    // 2. Hide the modal
    if (setModal) setModal({ ...modal, showModal: false });

    try {
      // 2. Try updating the block
      if (modal.activity) {
        await updateBlock(modal.currentBlockId, modal.activity.id, modal.notes);
        // 3. If successful, revalidate blocks data
        mutate('/logs');
      }
    } catch (e) {
      // 1. Show warning flash message
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
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
    mutate('/logs', newBlocks, false);
  };

  if (!activities || !blocks) {
    return null;
  }

  return (
    <form onSubmit={update}>
      <select
        className={selectClasses}
        value={modal.activity?.id || undefined}
        onChange={(e) => {
          if (!setModal) return;
          setModal({
            ...modal,
            activity: activities.find((a) => a.id === +e.target.value),
          });
        }}
      >
        <option value="">Select an activity</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>
      <button
        className={
          linkClasses + ' mt-2 inline-flex items-end text-sm font-bold'
        }
        onClick={changeTab}
      >
        Or create a new activity
      </button>
      <label className={labelClasses + ' mt-4'} htmlFor="notes">
        Notes
      </label>
      <textarea
        id="notes"
        name="notes"
        value={modal.notes || ''}
        onChange={(e) => {
          if (!setModal) return;
          setModal({
            ...modal,
            notes: e.target.value,
          });
        }}
        className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button type="submit" className={defaultButtonClasses + ' mt-4'}>
        Submit
      </button>
    </form>
  );
};
