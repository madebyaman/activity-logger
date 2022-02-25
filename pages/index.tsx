import { useRecoilState } from 'recoil';

import TimeGrid from '../components/dashboard/Blocks';
import { ActivityType, NextPageWithAuth } from '../types';
import Modal from '../components/dashboard/modal';
import { blockState, modalState } from '../components/dashboard/state';
import {
  addActivity,
  updateBlockActivity,
} from '../components/dashboard/utils';
import { flashMessageState } from '../components/FlashMessage/state';

const Home: NextPageWithAuth = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [blocks, setBlocks] = useRecoilState(blockState);
  const [flashMessages, setFlashMessages] = useRecoilState(flashMessageState);

  /**
   * When a new activity is submitted
   * @param Object New Activity to be added
   */
  const onSubmitNewActivity = async ({
    name,
    type,
  }: {
    name: string;
    type: ActivityType;
  }) => {
    // Hide activity modal
    setModal({ ...modal, showModal: false });
    try {
      // 1. Add the new activity
      const newActivity = await addActivity(name, type);
      // 2. Update the selectedActivity for that Block.
      if (modal.currentBlockId)
        updateBlock(modal.currentBlockId, newActivity.id);
    } catch (e) {
      setFlashMessages([
        ...flashMessages,
        {
          title: 'Error adding new activity',
          message:
            'There was a network error while adding a new activity. Try to refresh the page.',
          type: 'error',
        },
      ]);
    }
  };

  /**
   * It updates 'blockState' when a new activity is selected.
   * @param blockId Block id to be updated
   * @param activityId Activity id to update with.
   */
  const updateBlock = async (blockId: number, activityId: number) => {
    // 1. Update local state
    updateLocalBlock(blockId, activityId);

    try {
      await updateBlockActivity(blockId, activityId);
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
      updateLocalBlock(blockId, null);
    }
  };

  /**
   * This function updates the local state with the `activityId`
   * @param blockId Block id to be updated
   * @param activityId activity Id to update with.
   */
  const updateLocalBlock = (blockId: number, activityId: number | null) => {
    const newBlocks = blocks.map((block) => {
      if (block.id === blockId) {
        return {
          ...block,
          activityId,
        };
      } else {
        return block;
      }
    });
    setBlocks(newBlocks);
  };

  return (
    <div>
      <div
        className={`${
          modal.showModal && 'overflow-hidden blur-sm fixed pointer-events-none'
        }`}
      >
        <TimeGrid onUpdate={updateBlock} />
        {/* Grid Table */}
      </div>
      {/* Modal */}
      <Modal onSubmit={onSubmitNewActivity} />
    </div>
  );
};

Home.protectedRoute = true;

export default Home;
