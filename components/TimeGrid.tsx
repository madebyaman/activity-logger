import { time } from 'console';
import { Activity, TimeLog } from '../types';
import { noOfBlocksPerHour } from '../utils/initialState';
import Block from './Block';
import { allowBlockToEdit } from '../utils/block';

// Sleep hours = hours which we don't need to keep a track of.
const sleepHours = {
  from: 21,
  to: 5,
};

// PROPS
// 1. `activityOptions`: to pass them to block. Later on, when user changes noOfBlocksPerHour, we can change these options to merge conflic.
// 2. `setNewActivityName`: to pass this to Block. So it can be used by it.
const TimeGrid = ({
  activityOptions,
  setNewActivityName,
  onUpdate,
  blocks,
}: {
  activityOptions: Activity[];
  setNewActivityName: (input: string, blockId: string) => void;
  onUpdate: (blockId: string, newActivity: Activity | null) => void;
  blocks: TimeLog[];
}) => {
  return (
    <div className="mt-10">
      {/* Create array of [1, .. 23] */}
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
        // Map for each hour and show as one column
        .map((rederingHour) => {
          const gridColumns = {
            1: 'md:grid-cols-3',
            2: 'md:grid-cols-5',
            4: 'md:grid-cols-9',
          }; // This is to make sure purge css works correctly
          const sortBlocks = (a: TimeLog, b: TimeLog) => {
            if (a.from < b.from) return -1;
            if (a.from > b.from) return 1;
            return 0;
          };
          return (
            <div
              key={rederingHour}
              className={`grid grid-cols-3 ${gridColumns[noOfBlocksPerHour]}`}
            >
              <h3 className="font-sans text-4xl place-self-center font-bold">
                {rederingHour}
              </h3>
              {/* Inside each hour, render its blocks */}
              {blocks
                // 1. Show blocks only for hour currently being rendered.
                .filter(({ hour }) => hour === rederingHour)
                .sort(sortBlocks)
                .map((timeBlock) => {
                  const { block, blockId, activity } = timeBlock;
                  return (
                    <div
                      key={blockId}
                      className={`min-w-full h-28 px-3 py-6 bg-slate-50 grid place-content-center col-span-2 col-start-2 md:col-start-auto ${
                        block !== noOfBlocksPerHour - 1 && 'border-r'
                      }`}
                    >
                      {allowBlockToEdit(timeBlock) ? (
                        <Block
                          id={blockId}
                          activityOptions={activityOptions}
                          activity={activity}
                          setNewActivityName={setNewActivityName}
                          onUpdate={onUpdate}
                        />
                      ) : // show activity label if it is there
                      activity ? (
                        <p>{activity.label}</p>
                      ) : (
                        // show 'No activity` else
                        <p>No activity</p>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default TimeGrid;