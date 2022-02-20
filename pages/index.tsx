import moment from 'moment';
import { AiOutlinePieChart, AiOutlineTool } from 'react-icons/ai';
import { RecoilRoot, useRecoilState } from 'recoil';
import Link from 'next/link';

import TimeGrid from '../components/dashboard/TimeGrid';
import { ActivityType, NextPageWithAuth } from '../types';
import Modal from '../components/dashboard/modal';
import { blockState, modalState } from '../components/dashboard/state';
import {
  addActivity,
  updateBlockActivity,
} from '../components/dashboard/utils';

const HomeComponent = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [blocks, setBlocks] = useRecoilState(blockState);

  /**
   * When a new activity is submitted
   * @param param0 New Activity to be added
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
      console.error('Error adding new activity', e);
    }
  };

  /**
   * It updates 'blockState' when a new activity is selected.
   * @param blockId Block id to be updated
   * @param activityId Activity id to update with.
   */
  const updateBlock = async (blockId: number, activityId: number) => {
    try {
      const updatedBlock = await updateBlockActivity(blockId, activityId);
      // Update local state
      const newBlocks = blocks.map((block) => {
        if (block.id === updatedBlock.id) {
          return updatedBlock;
        } else {
          return block;
        }
      });
      setBlocks(newBlocks);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div
        className={`max-w-screen-lg w-11/12 px-4 mx-auto ${
          modal.showModal && 'overflow-hidden blur-sm fixed pointer-events-none'
        }`}
      >
        <div className="flex mt-10">
          {/* Flex */}
          <h2 className="flex-1 text-4xl font-sans uppercase font-black">
            {moment().format('LL')}
          </h2>
          {/* Today's date */}
          <Link href={'/preferences'}>
            <a
              aria-label="User preferences"
              className="bg-gray-600 rounded-full p-2 text-white"
            >
              {/* These buttons are not responsive. They kind of stretch once gone below the display size. */}
              <AiOutlineTool size={28} />
            </a>
          </Link>
          <Link href="/">
            <a
              aria-label="Reports"
              className="ml-4 bg-gray-600 rounded-full p-2 text-white"
            >
              <AiOutlinePieChart size={28} />
            </a>
          </Link>
          {/* Preferences */}
          {/* Reports */}
        </div>
        <TimeGrid onUpdate={updateBlock} />
        {/* Grid Table */}
      </div>
      {/* Modal */}
      <Modal onSubmit={onSubmitNewActivity} />
    </div>
  );
};

const Home: NextPageWithAuth = () => {
  return (
    <RecoilRoot>
      <HomeComponent />
    </RecoilRoot>
  );
};

Home.protectedRoute = true;

export default Home;
