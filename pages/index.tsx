import type { NextPage } from 'next';
import moment from 'moment';
import { AiOutlinePieChart, AiOutlineTool } from 'react-icons/ai';
import NewActivityDropDown from '../components/NewActivityDropDown';
import { useState } from 'react';
import NewActivityModal from '../components/NewActivityModal';

const Home: NextPage = () => {
  const [showNewActivityModal, setShowNewActivityModal] = useState(true);
  const [newActivityName, setNewActivityName] = useState('');

  const noOfBlocksPerHour = 2;
  const sleepHours = {
    from: 21,
    to: 5,
  };

  // Show Activity Modal
  const showActivityModalWithName = (name: string) => {
    setNewActivityName(name);
    setShowNewActivityModal(true);
  };

  const hideActivityModal = () => {
    setShowNewActivityModal(false);
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
                  {Array.from(Array(noOfBlocksPerHour).keys()).map((block) => (
                    <div
                      key={block}
                      className="px-3 py-6 bg-slate-50 border-r grid place-content-center col-span-2 col-start-2 md:col-start-auto"
                    >
                      <NewActivityDropDown
                        toggleActivityModal={showActivityModalWithName}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
      {showNewActivityModal && (
        <NewActivityModal activity={newActivityName} hide={hideActivityModal} />
      )}
    </div>
  );
};

export default Home;
