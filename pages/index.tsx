import type { NextPage } from 'next';
import moment from 'moment';
import { AiOutlinePieChart, AiOutlineTool } from 'react-icons/ai';
import Block from '../components/Block';
import { useState } from 'react';
import NewActivityModal from '../components/NewActivityModal';
import { ActivityOption, TimeLog } from '../types';

const noOfBlocksPerHour = 2;
const sleepHours = {
  from: 21,
  to: 5,
};

// Initialize a blank state to start tracking activities
let initialTimeLog: TimeLog[] = [];

// Why did I use two loops? One for initializing state and other for rendering state
// B/c I don't want to reinitialize initial state every time react re-renders the component. This would create lot of overhead problem.
Array.from(Array(24).keys()).forEach((hour) => {
  Array.from(Array(noOfBlocksPerHour).keys()).forEach((block) => {
    let fromMinutes;
    const toMinutes = (60 / noOfBlocksPerHour) * (block + 1);
    if (block === 0) {
      fromMinutes = 0;
    } else {
      fromMinutes = (60 / noOfBlocksPerHour) * block + 1;
    }
    const from = new Date(Date.now());
    from.setHours(hour);
    from.setMinutes(fromMinutes);
    from.setSeconds(0);
    const to = new Date(Date.now());
    to.setHours(hour);
    to.setMinutes(toMinutes);
    to.setSeconds(0);
    initialTimeLog.push({
      hour: hour,
      block: block,
      from,
      to,
    });
  });
});

const Home: NextPage = () => {
  const [timeLog, setTimeLog] = useState<TimeLog[]>(initialTimeLog);
  const [newActivityName, setNewActivityName] = useState('');
  const [activityOptions, setActivityOptions] = useState<ActivityOption[]>([
    { name: 'Development', type: 'Very Productive' },
    { name: 'Running', type: 'Productive' },
    { name: 'Reading', type: 'Productive' },
    { name: 'Designing', type: 'Productive' },
    { name: 'YouTube', type: 'Very Distracting' },
    { name: 'Playing', type: 'Neutral' },
    { name: 'Netflix', type: 'Very Distracting' },
    { name: 'Eating', type: 'Neutral' },
    { name: 'Driving', type: 'Distracting' },
  ]);
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);

  // This func gets called by `PickActivityDropdown` when someone clicks the option to create new option
  const changeNewActivityNameAndShowNewActivityModal = (input: string) => {
    // Here we should do 2 things
    // 1. Update new activity name so it is pre-filled in new activity modal
    setNewActivityName(input);
    // 2. show activity modal
    setShowNewActivityModal(true);
  };

  // It gets called when user submits form to create a new activity.
  const onSubmitNewActivity = (newActivity: ActivityOption) => {
    // 1. Add the new activity
    setActivityOptions([...activityOptions, newActivity]);
    // 2. Update the selectedActivity for that Block.
  };

  return (
    <div>
      <div
        className={`max-w-screen-lg w-11/12 px-4 mx-auto ${
          showNewActivityModal &&
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
        {/* Grid Table */}
        <div className="mt-10">
          {Array.from(Array(24).keys())
            .filter((hour) => {
              // Filter function eliminates all the sleep hours
              const { from, to } = sleepHours;
              if (from > to) {
                // if from > to, then Person sleeps before 12am, say 21 to 6
                // Now we will return hour if it is not in between from-24 & 1-to.
                if (hour >= from && hour <= 24) return false;
                if (hour >= 0 && hour < to) return false;
                return true;
              } else {
                // if from is not greater than to. It means either from == to, which means person doesn't sleep
                // Or to > from, which means person sleeps after 12am, say 1am to 10am.
                // In this case we will return if hour is not between 1 and 10.
                if (hour >= from && hour < to) return false;
                return true;
              }
            })
            .map((hour) => {
              const gridColumns = {
                1: 'md:grid-cols-3',
                2: 'md:grid-cols-5',
                4: 'md:grid-cols-9',
              }; // This is to make sure purge css works correctly
              return (
                // Show this div as a flexbox to contain all in one row
                <div
                  key={hour}
                  className={`grid grid-cols-3 ${gridColumns[noOfBlocksPerHour]}`}
                >
                  <h3 className="font-sans text-4xl place-self-center font-bold">
                    {hour}
                  </h3>
                  {Array.from(Array(noOfBlocksPerHour).keys()).map((block) => {
                    const blockId = `${hour}${block + 1}`;
                    return (
                      <div
                        key={block}
                        className="px-3 py-6 bg-slate-50 border-r grid place-content-center col-span-2 col-start-2 md:col-start-auto"
                      >
                        <Block
                          activityOptions={activityOptions}
                          setNewActivityName={
                            changeNewActivityNameAndShowNewActivityModal
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
      {showNewActivityModal && (
        <NewActivityModal
          activity={newActivityName}
          onSubmit={onSubmitNewActivity}
        />
      )}
    </div>
  );
};

export default Home;
