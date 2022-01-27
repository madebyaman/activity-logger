import type { NextPage } from 'next';
import moment from 'moment';
import initialTimeLog from '../utils/initialState';
import { AiOutlinePieChart, AiOutlineTool } from 'react-icons/ai';
import { useState } from 'react';
import NewActivityModal from '../components/NewActivityModal';
import { Activity, TimeLog } from '../types';
import TimeGrid from '../components/TimeGrid';
import { v4 } from 'uuid';

const Home: NextPage = () => {
  const [timeLog, setTimeLog] = useState<TimeLog[]>(initialTimeLog);
  const [activityOptions, setActivityOptions] = useState<Activity[]>([
    { label: 'Development', type: 'Very Productive', value: v4() },
    { label: 'Running', type: 'Productive', value: v4() },
    { label: 'Reading', type: 'Productive', value: v4() },
    { label: 'Designing', type: 'Productive', value: v4() },
    { label: 'YouTube', type: 'Very Distracting', value: v4() },
    { label: 'Playing', type: 'Neutral', value: v4() },
    { label: 'Netflix', type: 'Very Distracting', value: v4() },
    { label: 'Eating', type: 'Neutral', value: v4() },
    { label: 'Driving', type: 'Distracting', value: v4() },
  ]);
  const [activityModalState, setActivityModalState] = useState({
    name: '',
    showModal: false,
    currentBlockId: '',
  });

  // This func gets called by `PickActivityDropdown` when someone clicks the option to create new option
  const changeNewActivityNameAndShowNewActivityModal = (
    input: string,
    blockId: string
  ) => {
    // Here we should do 3 things
    // 1. Update new activity name so it is pre-filled in new activity modal
    // 2. show activity modal
    // 3. set current blockid
    setActivityModalState({
      name: input,
      showModal: true,
      currentBlockId: blockId,
    });
  };

  // It gets called when user submits form to create a new activity.
  const onSubmitNewActivity = (newActivity: Activity) => {
    // Hide activity modal
    setActivityModalState({ ...activityModalState, showModal: false });
    // 1. Add the new activity
    setActivityOptions([...activityOptions, newActivity]);
    // 2. Update the selectedActivity for that Block.
    console.log(
      'Updating activity',
      newActivity,
      activityModalState.currentBlockId
    );
    updatedActivityOfBlock(activityModalState.currentBlockId, newActivity);
  };

  // TODO udpate selected activity method
  const updatedActivityOfBlock = (
    blockId: string,
    newActivity: Activity | null
  ) => {
    const blockToUpdate = timeLog.filter((block) => block.blockId === blockId);
    if (blockToUpdate.length === 1) {
      const updatedBlock: TimeLog[] = blockToUpdate.map((block) => {
        return {
          ...block,
          activity: newActivity || undefined,
        };
      });
      if (updatedBlock.length === 1) {
        const removedBlockFromTimeLog = timeLog.filter(
          (block) => block.blockId !== blockId
        );
        setTimeLog([...removedBlockFromTimeLog, ...updatedBlock]);
      }
    }
  };

  return (
    <div>
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
          <button
            aria-label="User preferences"
            className="bg-gray-600 rounded-full p-2 text-white"
          >
            {/* These buttons are not responsive. They kind of stretch once gone below the display size. */}
            <AiOutlineTool size={28} />
          </button>
          <button
            aria-label="Reports"
            className="ml-4 bg-gray-600 rounded-full p-2 text-white"
          >
            <AiOutlinePieChart size={28} />
          </button>
          {/* Preferences */}
          {/* Reports */}
        </div>
        <TimeGrid
          activityOptions={activityOptions}
          setNewActivityName={changeNewActivityNameAndShowNewActivityModal}
          onUpdate={updatedActivityOfBlock}
          blocks={timeLog}
        />
        {/* Grid Table */}
      </div>
      {activityModalState.showModal && (
        <NewActivityModal
          activity={activityModalState.name}
          onSubmit={onSubmitNewActivity}
        />
      )}
    </div>
  );
};

export default Home;
