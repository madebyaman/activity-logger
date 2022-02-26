import { Log } from '@prisma/client';

import { showBlock } from './showBlock';
import { convertNumberToHour, useBlocks, useProfile } from '../../utils';
import { Block } from './Block';
import { BlocksPerHourType } from '../../types';

export const Blocks = ({}) => {
  const { profile } = useProfile();
  const { sleepFrom, sleepTo } = profile;
  const blocksPerHour = profile.blocksPerHour as BlocksPerHourType;
  const { blocks, isLoading, isError } = useBlocks();

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
  const sortBlocks = (a: Log, b: Log) => {
    if (a.from < b.from) return -1;
    if (a.from > b.from) return 1;
    return 0;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <div className="mt-4">
      {/* Create array of [1, .. 23] */}
      {blocks.length
        ? Array.from(Array(24).keys())
            // But eliminate sleep hours.
            .filter(filterBlocks)
            // Map for each hour
            .map((currentHour) => {
              return (
                <div
                  key={currentHour}
                  className={`grid grid-cols-3 ${gridColumns[blocksPerHour]}`}
                >
                  <h3 className="font-display text-2xl place-self-center">
                    {convertNumberToHour(currentHour)}
                  </h3>
                  {/* Inside each hour, render its blocks */}
                  {blocks
                    .filter(({ hour }) => hour === currentHour)
                    .sort(sortBlocks)
                    .map((timeBlock) => {
                      const { id, to, activityId, notes } = timeBlock;
                      return (
                        <div
                          key={id}
                          className={`min-w-full h-28 px-3 py-6 bg-gray-100 grid col-span-2 col-start-2 md:col-start-auto place-content-center hover:bg-gray-200 ${
                            new Date(`${to}`).getMinutes() !== 0 && 'border-r'
                          }`}
                        >
                          {showBlock(to) ? (
                            <Block
                              id={id}
                              activityId={activityId}
                              notes={notes || ''}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            })
        : 'No blocks found'}
    </div>
  );
};
