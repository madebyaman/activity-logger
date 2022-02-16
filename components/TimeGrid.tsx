import { Activity, TimeLog, UserPreferences } from '../types';
import Block from './Block';
import { allowBlockToEdit } from '../utils/block';
import { useContext } from 'react';
import { UserPreferencesContext } from '../pages/_app';
import { useDailyLog, useLogs } from '../utils/hooks';

export const blockTypeColors = {
  Neutral: 'bg-gray-500',
  Productive: 'bg-green-300',
  'Very Productive': `bg-green-600`,
  Distracting: `bg-orange-400`,
  'Very Distracting': `bg-red-700`,
};

/**
 * PROPS
 * 1. `onAdd`: Func to call when adding a new activity.
 * 2. `onUpdate`: Func to call when updating activity for a block.
 */
const TimeGrid = ({
  onAdd,
  onUpdate,
}: {
  onAdd: (input: string, blockId: number) => void;
  onUpdate: (blockId: number, activityId: number) => void;
}) => {
  const { userPreferences, setUserPreferences } = useContext(
    UserPreferencesContext
  );
  const { sleepFrom, sleepTo } = userPreferences;
  const { logs, isLoading, isError } = useLogs();

  // This is to make sure purge css works correctly in Tailwind
  const gridColumns = {
    1: 'md:grid-cols-3',
    2: 'md:grid-cols-5',
    4: 'md:grid-cols-9',
  };

  /**
   * Filter out blocks that come in sleep time.
   */
  const filterBlocks = (hour: number) => {
    if (sleepFrom > sleepTo) {
      if (hour >= sleepFrom && hour <= 24) return false;
      if (hour >= 0 && hour < sleepTo) return false;
      return true;
    } else {
      if (hour >= sleepFrom && hour < sleepTo) return false;
      return true;
    }
  };

  /**
   * Sort function to sort blocks by start time.
   */
  const sortBlocks = (a: TimeLog, b: TimeLog) => {
    if (a.from < b.from) return -1;
    if (a.from > b.from) return 1;
    return 0;
  };

  return (
    <div className="mt-10">
      {/* Create array of [1, .. 23] */}
      {Array.from(Array(24).keys())
        // But eliminate sleep hours.
        .filter(filterBlocks)
        // Map for each hour and show as one column
        .map((rederingHour) => {
          return (
            <div
              key={rederingHour}
              className={`grid grid-cols-3 ${gridColumns[blocksPerHour]}`}
            >
              <h3 className="font-sans text-4xl place-self-center">
                {rederingHour}
              </h3>
              {/* Inside each hour, render its blocks */}
              {blocks
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
                        <div className="flex items-center">
                          <span
                            className={`w-3 h-3 mr-2 inline-block rounded-full ${
                              blockTypeColors[activity.type]
                            }`}
                          ></span>
                          <p className="font-light text-gray-700">
                            {activity.label}
                          </p>
                        </div>
                      ) : (
                        // else show nothing
                        ''
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
