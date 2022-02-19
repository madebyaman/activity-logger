import moment from 'moment';
import { AiOutlinePieChart, AiOutlineTool } from 'react-icons/ai';
import { useState } from 'react';
import NewActivityModal from '../components/NewActivityModal';
import { Activity, NextPageWithAuth } from '../types';
import TimeGrid from '../components/dashboard/TimeGrid';
import Link from 'next/link';
import { addActivity } from '../utils/addActivity';
import { RecoilRoot, useRecoilState } from 'recoil';
import { updateBlockActivity } from '../utils/updateLog';
import { blockState } from '../components/dashboard/blockState';

const HomeComponent = () => {
  const [activityModalState, setActivityModalState] = useState({
    name: '',
    showModal: false,
    currentBlockId: 0,
  });
  const [blocks, setBlocks] = useRecoilState(blockState);

  /**
   * When someone clicks the option to create new activity, we update `activityModalState` to show modal.
   * @param input Name of the activity
   * @param id Current block id, which called the modal. When a new activity is added, using this id, we update the current block.
   */
  const addingNewActivity = (input: string, id: number) => {
    setActivityModalState({
      name: input,
      showModal: true,
      currentBlockId: id,
    });
  };

  /**
   * When a new activity is submitted
   * @param param0 New Activity to be added
   */
  const onSubmitNewActivity = async ({ name, type }: Activity) => {
    // Hide activity modal
    setActivityModalState({ ...activityModalState, showModal: false });
    try {
      // 1. Add the new activity
      const newActivity = await addActivity(name, type);
      // 2. Update the selectedActivity for that Block.
      updateBlock(activityModalState.currentBlockId, newActivity.id);
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
    <div
      className={`max-w-screen-lg w-11/12 px-4 mx-auto ${
        activityModalState.showModal &&
        'overflow-hidden blur-sm fixed pointer-events-none'
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
      <TimeGrid onAdd={addingNewActivity} onUpdate={updateBlock} />
      {/* Grid Table */}
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
