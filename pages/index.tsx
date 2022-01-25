import type { NextPage } from 'next';
import moment from 'moment';
import { AiOutlinePieChart, AiOutlineTool } from 'react-icons/ai';

const Home: NextPage = () => {
  const noOfBlocksPerHour = 4;
  return (
    <div className="container mx-auto">
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
        {Array.from(Array(16).keys()).map((hour) => (
          // Show this div as a flexbox to contain all in one row
          <div key={hour} className="grid grid-cols-3 md:grid-cols-9">
            <h3 className="font-sans text-4xl place-self-center font-bold">
              {hour + 1}
            </h3>
            {Array.from(Array(noOfBlocksPerHour).keys()).map((block) => (
              <div
                key={block}
                className="px-3 py-6 bg-slate-50 border-r grid place-content-center col-span-2 col-start-2 md:col-start-auto"
              >
                New activity
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
